"use client";

import { Check, Link } from "lucide-react";
import { useCallback, useState } from "react";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { onlyAalphaNumeric } from "@/lib/utils/security";

export interface MDXHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function MDXHeading({
  level,
  children,
  id,
  className,
}: MDXHeadingProps) {
  const [copyStatus, setCopyStatus] = useState(false);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const slug =
    id ||
    (typeof children === "string"
      ? onlyAalphaNumeric(children, level.toString())
      : `t`) ||
    `heading-${level}-${Math.random().toString(36).substring(2, 9)}`;

  const handleCopy = useCallback(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${slug}`;
      navigator.clipboard.writeText(url);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 5000); // Reset copy status after 5 seconds
      toast.success("Link copied to clipboard!");
    }
  }, [slug]);

  return (
    <Tag id={slug} className={cn(`group scroll-mt-20`, className)}>
      <span className="flex items-center gap-2">
        {children}
        <Button
          variant={!copyStatus ? "outline" : "default"}
          disabled={copyStatus}
          size="icon"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity h-full p-1.5"
        >
          {copyStatus ? (
            <Check className="w-4 h-4" />
          ) : (
            <Link className="w-4 h-4" />
          )}
        </Button>
      </span>
    </Tag>
  );
}
