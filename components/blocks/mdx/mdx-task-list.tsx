"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface MDXTaskListProps {
  children: React.ReactNode;
  className?: string;
}

export interface MDXTaskListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function MDXTaskList({ children, className }: MDXTaskListProps) {
  return (
    <ul className={cn(`list-none space-y-3 my-4`, className)}>{children}</ul>
  );
}

export function MDXTaskListItem({ children, className }: MDXTaskListItemProps) {
  return (
    <li className={cn(`flex items-start gap-2 text-sm`, className)}>
      {children}
    </li>
  );
}

interface MDXCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}

export function MDXCheckbox({
  checked = false,
  disabled = true,
  className,
}: MDXCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      className={cn(
        `mt-1 flex-shrink-0
        h-4 w-4 
        rounded border border-muted
        bg-background
        text-primary
        focus:ring-2 focus:ring-offset-2 focus:ring-primary
        dark:border-muted-foreground/30
        disabled:opacity-60`,
        className,
      )}
      readOnly
    />
  );
}
