"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useRef } from "react";

interface OptimizedLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  external?: boolean;
}

export function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  external = false,
  ...props
}: OptimizedLinkProps) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (prefetch && !external && typeof href === "string") {
      router.prefetch(href);
    }
  }, [href, prefetch, external, router]);

  if (external) {
    return (
      <a
        href={href as string}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-primary underline-offset-4 hover:underline",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      ref={linkRef}
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
