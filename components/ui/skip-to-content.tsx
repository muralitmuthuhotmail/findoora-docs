"use client";

import { cn } from "@/lib/utils";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-xl",
        "font-medium text-sm transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      )}
    >
      Skip to main content
    </a>
  );
}
