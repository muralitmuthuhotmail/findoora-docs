"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X, Clock, Hash } from "lucide-react";
import Link from "next/link";
import {
  searchContent,
  getPopularSearchTerms,
  type SearchResult,
} from "@/lib/utils/search";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  trackSearch,
  trackContentView,
} from "@/components/analytics/google-analytics";

interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ isOpen, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularTerms, setPopularTerms] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem("search-recent");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch {
          setRecentSearches([]);
        }
      }
      getPopularSearchTerms().then(setPopularTerms);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchContent(query);
        setResults(data);
        setSelectedIndex(0);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const saveSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;

      const updated = [
        trimmed,
        ...recentSearches.filter((s) => s !== trimmed),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("search-recent", JSON.stringify(updated));

      // Track search event
      trackSearch(trimmed, results.length);
    },
    [recentSearches, results.length],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!query || isLoading) return;
      const total = results.length;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % total);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + total) % total);
      } else if (
        e.key === "Enter" &&
        selectedIndex >= 0 &&
        selectedIndex < total
      ) {
        e.preventDefault();
        const selectedResult = results[selectedIndex];
        if (selectedResult) {
          onOpenChange(false);
          saveSearch(query);
          setTimeout(() => {
            router.push(
              `/${selectedResult.post.metadata.category}/${selectedResult.post.slug}`,
            );
          }, 300);
        }
      }
    },
    [
      query,
      isLoading,
      results,
      selectedIndex,
      onOpenChange,
      saveSearch,
      router,
    ],
  );

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const showEmpty =
    !query && (recentSearches.length > 0 || popularTerms.length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "bg-card w-screen !max-w-[calc(100vw)] h-screen md:w-[600px] md:h-[60vh] rounded-none md:rounded-xl flex flex-col md:outline-4 pt-15 md:pt-6",
        )}
        onKeyDown={handleKeyDown}
        aria-label="Search Dialog"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search documentation</DialogDescription>
        </DialogHeader>

        {/* Input */}
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 pr-8"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <Button
                size={"sm"}
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setQuery("")}
                tabIndex={-1}
              >
                <X />
              </Button>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onOpenChange(false)}
            variant="ghost"
            className="md:hidden"
          >
            Close
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10">
              <LoadingSpinner />
              <span className="text-sm text-muted-foreground">
                Searching...
              </span>
            </div>
          ) : query ? (
            results.length > 0 ? (
              <div className="space-y-2">
                {results.map((r, i) => (
                  <Link
                    key={r.post.slug}
                    href={`/${r.post.metadata.category}/${r.post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenChange(false);
                      saveSearch(query);
                      // Track content view
                      trackContentView("documentation", r.post.slug);
                      setTimeout(() => {
                        router.push(
                          `/${r.post.metadata.category}/${r.post.slug}`,
                        );
                      }, 300);
                    }}
                    className={cn(
                      "block px-3 py-2 rounded-md transition hover:bg-accent hover:text-accent-foreground hover:border-border hover:border-1",
                      i === selectedIndex && "bg-accent border-border border-1",
                    )}
                  >
                    <div className="">
                      <Badge
                        className="mr-2 text-xs bg-chart-1/20 rounded-sm"
                        variant={"outline"}
                      >
                        {r.post.metadata.category}
                      </Badge>
                      <span className="font-medium pr-1">
                        {r.post.metadata.title}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {r.excerpt}
                    </div>
                    {r.post.metadata.tags && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {r.post.metadata.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(
                        r.post.metadata.publishedAt ?? "",
                      ).toLocaleDateString()}{" "}
                      {r.post.metadata.author && ` | ${r.post.metadata.author}`}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm mt-10">
                No results found.
              </p>
            )
          ) : (
            showEmpty && (
              <div className="space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1 px-1">
                      Recent
                    </p>
                    <div className="space-y-1">
                      {recentSearches.map((s, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          className="w-full justify-start px-2"
                          onClick={() => setQuery(s)}
                        >
                          <Clock className="h-3 w-3 mr-2" />
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {popularTerms.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1 px-1">
                      Popular
                    </p>
                    <div className="space-y-1">
                      {popularTerms.map((term, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          className="w-full justify-start px-2"
                          onClick={() => setQuery(term)}
                        >
                          <Hash className="h-3 w-3 mr-2" />
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Footer (desktop only) */}
        <div className="hidden md:flex items-center justify-between border-t pl-2 pt-3 text-xs text-muted-foreground">
          <p>
            {query && results.length > 0 && (
              <>
                <kbd className="kbd border-border border px-2 py-1 rounded-sm">
                  ↑↓ Up/Down
                </kbd>{" "}
                to navigate,{" "}
                <kbd className="kbd border-border border px-2 py-1 rounded-sm">
                  ↵ Enter
                </kbd>
                to select,{" "}
              </>
            )}
            <kbd className="kbd border-border border px-2 py-1 rounded-sm">
              ⎋ esc
            </kbd>{" "}
            to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
