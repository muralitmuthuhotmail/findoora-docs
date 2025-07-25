"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface MDXLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MDXLink({ href, children, className }: MDXLinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `inline-flex items-center gap-1 text-primary hover:underline`,
          className,
        )}
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`text-primary hover:underline ${className || ""}`}
    >
      {children}
    </Link>
  );
}
