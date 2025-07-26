"use client";

import { LanguageIcon } from "@/components/ui/language-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import { memo, RefObject, useCallback, useRef, useState } from "react";

interface CopyButtonProps {
  copyFrom?: RefObject<HTMLSpanElement | null>;
}

const CopyButton = memo(function CopyButton({ copyFrom }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!navigator.clipboard) {
      console.warn("Clipboard API not supported in this browser.");
      return;
    }
    if (!copyFrom || !copyFrom.current) {
      console.warn(
        "CopyButton requires a copyFrom prop with a valid HTMLSpanElement.",
      );
      return;
    }
    await navigator.clipboard.writeText(copyFrom.current.textContent || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [copyFrom]);

  if (!copyFrom) {
    console.warn(
      "CopyButton requires a copyFrom prop with a valid HTMLSpanElement.",
    );
    return null;
  }

  return (
    <Button
      size={"sm"}
      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs hover:shadow-md mx-h-2 bg-primary/80 hover:bg-primary/90 text-xs text-primary-foreground scale-90 rounded-md"
      onClick={handleCopy}
      tabIndex={0}
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="scale-95" />
      ) : (
        <Clipboard className="scale-95" />
      )}
      {copied ? "Copied" : "Copy"}
      <span className="sr-only">Copy code</span>
    </Button>
  );
});

export interface MDXCodeProps {
  children: string;
  className?: string;
  "data-language"?: string;
  language?: string; // For backward compatibility
}

export function MDXCode({
  children,
  className,
  "data-language": language,
}: MDXCodeProps) {
  const codeRef = useRef<HTMLSpanElement>(null);

  if (!language) {
    language = className?.match(/language-(\w+)/)?.[1];
  }

  return (
    <>
      <p className={cn("relative group pt-10", className)}>
        {language && (
          <span className="absolute top-0 left-0 text-xs text-accent-foreground bg-accent/90 border border-border px-2 py-1 rounded capitalize">
            <LanguageIcon
              className="inline mr-2"
              language={language}
              size={12}
            />
            {language}
          </span>
        )}
        <span ref={codeRef}>{children}</span>
        <CopyButton copyFrom={codeRef} />
      </p>
    </>
  );
}
