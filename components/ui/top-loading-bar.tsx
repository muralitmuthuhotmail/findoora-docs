"use client";

import { cn } from "@/lib/utils";

interface TopLoadingBarProps {
  className?: string;
  height?: number;
  color?: string;
}

export function TopLoadingBar({ className }: TopLoadingBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999]">
      <div
        className={cn(
          "h-1 bg-primary/90 amimate-loading-bar w-full",
          className,
        )}
      />
    </div>
  );
}
