"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check, Link2, Share2 } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  FaFacebook as Facebook,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter,
} from "react-icons/fa";
import { trackSocialShare } from "@/components/analytics/google-analytics";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function SocialShare({
  url,
  title,
  description,
  className,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareData = useCallback(
    () => ({
      url,
      title,
      text: description || title,
    }),
    [url, title, description],
  );

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // Track copy link event
      trackSocialShare("copy_link", url);
    } catch (err) {
      console.debug("Error copying link:", err);
      setCopied(false);
    }
  }, [url]);

  const handleNativeShare = useCallback(async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData());
        // Track native share event
        trackSocialShare("native_share", url);
      } catch (err) {
        console.debug("Error sharing:", err);
      }
    }
  }, [shareData, url]);

  const shareLinks = useMemo(
    () => [
      {
        name: "Twitter",
        icon: Twitter,
        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(description || title)}`,
      },
      {
        name: "Facebook",
        icon: Facebook,
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || "")}`,
      },
    ],
    [url, title, description],
  );

  const [canNativeShare, setCanNativeShare] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      setCanNativeShare(true);
    } else {
      setCanNativeShare(false);
    }
  }, []);

  // SSR-safe check for navigator.share
  const shareButton = useMemo(
    () =>
      canNativeShare ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          aria-label="Share article"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" aria-label="Share article">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {shareLinks.map((link) => (
              <DropdownMenuItem key={link.name} asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => trackSocialShare(link.name.toLowerCase(), url)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onClick={handleCopyLink}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--success)]" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy link"}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    [
      canNativeShare,
      copied,
      shareLinks,
      handleNativeShare,
      handleCopyLink,
      url,
    ],
  );

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      suppressHydrationWarning
    >
      {/* Native share button (mobile) */}
      {shareButton}
    </div>
  );
}
