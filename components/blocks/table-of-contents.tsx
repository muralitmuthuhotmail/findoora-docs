"use client";
import { extractHeadingsWithIgnorePatterns } from "@/lib/utils/markdown-parser";
import type { HeadingItem, TableOfContentsProps } from "@/types/content.types";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getAlphaNumeric, onlyAalphaNumeric } from "@/lib/utils/security";

export function TableOfContents({
  content,
  className = "",
  scrollable = true,
}: TableOfContentsProps) {
  // Offset for sticky header (adjust this value based on your app bar height)
  const SCROLL_OFFSET = 80;
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Element[]>([]);
  const tocContainerRef = useRef<HTMLDivElement | null>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  const smoothScrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - SCROLL_OFFSET;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    [SCROLL_OFFSET],
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
      e.preventDefault();
      setActiveId(elementId); // Immediate visual feedback
      smoothScrollToElement(elementId);
      // Update URL without triggering a page jump
      window.history.replaceState(null, "", `#${elementId}`);
    },
    [smoothScrollToElement],
  );

  // Memoize heading extraction and tree building
  const headings = useMemo(() => {
    const extractHeadings = (content: string): HeadingItem[] => {
      const headings = extractHeadingsWithIgnorePatterns(content);
      return buildTree(headings);
    };

    const buildTree = (
      items: { level: number; text: string; id: string; position: number }[],
    ): HeadingItem[] => {
      const tree: HeadingItem[] = [];
      const stack: HeadingItem[] = [];

      for (const item of items) {
        const existingId =
          onlyAalphaNumeric(item.id, item.level.toString()) ||
          `heading-${item.level}-${Math.random().toString(36).substring(2, 9)}`;

        const title = getAlphaNumeric(item.text);

        const node: HeadingItem = {
          level: item.level,
          text: title,
          id: existingId,
          children: [],
        };

        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== undefined &&
          (stack[stack.length - 1]?.level ?? 0) >= node.level
        ) {
          stack.pop();
        }

        if (stack.length === 0) {
          tree.push(node);
          stack.push(node);
        } else {
          const parent = stack[stack.length - 1];
          parent?.children.push(node);
          stack.push(node);
        }
      }

      return tree;
    };

    return extractHeadings(content);
  }, [content]);

  // Memoize observer callback to prevent unnecessary re-creation
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(
        (entry) => entry.isIntersecting && entry.intersectionRatio > 0,
      );

      if (intersectingEntries.length > 0) {
        // Get the topmost intersecting heading
        const topEntry = intersectingEntries.reduce((prev, current) => {
          const prevTop = prev.boundingClientRect.top;
          const currentTop = current.boundingClientRect.top;

          // Prefer headings closer to the top threshold
          if (Math.abs(prevTop) < Math.abs(currentTop)) {
            return prev;
          }
          return current;
        });

        const newActiveId = topEntry.target.id;
        setActiveId((prev) => (prev !== newActiveId ? newActiveId : prev));
      }
    },
    [],
  );

  // Optimize intersection observer setup
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      headingElementsRef.current.forEach((element) => {
        observerRef.current?.unobserve(element);
      });
      observerRef.current.disconnect();
    }

    const headingElements = Array.from(
      document.querySelectorAll(
        "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
      ),
    );

    if (headingElements.length === 0) return;

    headingElementsRef.current = headingElements;

    // Create observer with optimized configuration
    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: `-${SCROLL_OFFSET}px 0px -66% 0px`,
      threshold: [0, 0.1], // Reduced threshold points for better performance
    });

    headingElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // Set initial active heading based on URL hash
    const hash = window.location.hash.slice(1);
    if (hash && headingElements.some((el) => el.id === hash)) {
      setActiveId(hash);
    } else if (headingElements.length > 0 && headingElements[0]) {
      // Set first heading as active by default
      setActiveId(headingElements[0].id ?? "");
    }

    return () => {
      if (observerRef.current) {
        headingElementsRef.current.forEach((element) => {
          observerRef.current?.unobserve(element);
        });
        observerRef.current.disconnect();
      }
    };
  }, [observerCallback, SCROLL_OFFSET]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Scroll active link into center of container when activeId changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (activeLinkRef.current && tocContainerRef.current) {
        const link = activeLinkRef.current;
        const container = tocContainerRef.current;
        // Only scroll if link is not already centered
        const linkRect = link.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (
          linkRect.top < containerRect.top ||
          linkRect.bottom > containerRect.bottom
        ) {
          link.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    }, 500); // Delay to ensure DOM updates
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeId]);

  // Memoize heading list rendering
  const renderHeadingList = useCallback(
    (items: HeadingItem[]): ReactNode => {
      const renderMenuItem = (item: HeadingItem) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            asChild
            className={cn(
              "text-nowrap transition-colors duration-200",
              activeId === item.id && "bg-primary/10 text-primary",
            )}
          >
            <Link
              href={`#${item.id}`}
              title={item.text}
              className={cn(
                "cursor-pointer block px-2 py-1",
                activeId === item.id && "text-primary font-semibold",
              )}
              onClick={(e) => handleLinkClick(e, item.id)}
              aria-current={activeId === item.id ? "location" : undefined}
              aria-describedby={
                item.children.length > 0 ? `${item.id}-children` : undefined
              }
              ref={activeId === item.id ? activeLinkRef : undefined}
            >
              {item.text}
            </Link>
          </SidebarMenuButton>
          {item.children.length > 0 && (
            <SidebarMenuSub id={`${item.id}-children`}>
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child.id}>
                  <SidebarMenuSubButton
                    asChild
                    className={cn(
                      "transition-colors duration-200",
                      activeId === child.id &&
                        "bg-primary/10 text-primary font-base text-sm px-2 py-1",
                    )}
                  >
                    <Link
                      href={`#${child.id}`}
                      title={child.text}
                      className={cn(
                        "cursor-pointer block",
                        activeId === child.id && "text-primary font-semibold",
                      )}
                      onClick={(e) => handleLinkClick(e, child.id)}
                      aria-current={
                        activeId === child.id ? "location" : undefined
                      }
                      ref={activeId === child.id ? activeLinkRef : undefined}
                    >
                      {child.text}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );

      return (
        <nav
          aria-labelledby="toc-heading"
          role="navigation"
          ref={tocContainerRef}
          className={cn(
            "overflow-y-auto p-1 mb-4",
            scrollable ? "max-h-[calc(100vh-250px)]" : "h-fit",
          )}
        >
          <SidebarMenu>{items.map(renderMenuItem)}</SidebarMenu>
        </nav>
      );
    },
    [activeId, handleLinkClick, scrollable],
  );

  // Early return with memoized check
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <aside
        className={cn("prose dark:prose-invert max-w-none")}
        aria-label="Table of contents"
      >
        <h1
          id="toc-heading"
          className="title font-semibold text-md text-accent-foreground mb-2 p-2 inline-flex items-center gap-2"
        >
          In this page
        </h1>
        {renderHeadingList(headings)}
      </aside>
    </div>
  );
}
