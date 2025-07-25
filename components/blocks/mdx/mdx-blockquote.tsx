"use client";

import { cn } from "@/lib/utils";

interface MDXBlockquoteProps {
  children: React.ReactNode;
  className?: string;
}

export function MDXBlockquote({ children, className }: MDXBlockquoteProps) {
  return (
    <blockquote
      className={cn(
        `border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground `,
        className,
      )}
    >
      {children}
    </blockquote>
  );
}
