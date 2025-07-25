"use client";

import { Check, Link } from "lucide-react";
import { useCallback, useState } from "react";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
      ? children.toLowerCase().replace(/\s+/g, "-")
      : "");

  const handleCopy = useCallback(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${slug}`;
      navigator.clipboard.writeText(url);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
      toast.success("Link copied to clipboard!");
    }
  }, [slug]);

  return (
    <Tag id={slug} className={cn(`group scroll-mt-20`, className)}>
      <span className="flex items-center gap-2">
        {children}
        <Button
          variant={"ghost"}
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground w-4 h-4"
        >
          {copyStatus ? (
            <>
              <Check className="w-4 h-4" />
            </>
          ) : (
            <Link className="w-4 h-4" />
          )}
        </Button>
      </span>
    </Tag>
  );
}
