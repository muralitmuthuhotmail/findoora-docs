"use client";

import { useSearch } from "@/components/providers/search-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { useCallback } from "react";

interface SearchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof Button> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function SearchButton({
  className,
  variant,
  size,
  children,
  onClick,
  ...props
}: SearchButtonProps) {
  const { openSearch } = useSearch();

  const handleSearchClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      openSearch();

      if (onClick) {
        onClick(event);
      }
    },
    [openSearch, onClick],
  );

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn(className)}
        onClick={handleSearchClick}
        {...props}
      >
        {children}
      </Button>
    </>
  );
}
