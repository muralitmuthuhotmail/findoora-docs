import Logo from "@/components/ui/logo";
import { memo } from "react";
import { FaGithub, FaLinkedin, FaRss } from "react-icons/fa";

import {
  LINKEDIN_URL,
  GITHUB_URL,
  RSS_URL,
  SITE_NAME,
  SITE_SUB_TITLE,
  SITE_AUTHOR,
} from "@/lib/config";
import Link from "next/link";
const SOCIAL_LINKS = [
  {
    href: LINKEDIN_URL,
    icon: FaLinkedin,
    label: "Follow us on LinkedIn",
  },
  {
    href: GITHUB_URL,
    icon: FaGithub,
    label: "Follow us on GitHub",
  },
  {
    href: RSS_URL,
    icon: FaRss,
    label: "Subscribe to RSS feed",
  },
] as const;

// Social Links Component
const SocialLinks = memo(() => (
  <div className="flex items-center gap-3">
    {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
      <Link
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-accent rounded-lg"
        aria-label={label}
      >
        <Icon className="h-4 w-4" />
      </Link>
    ))}
  </div>
));

SocialLinks.displayName = "SocialLinks";

// Legal Links Component
const LegalLinks = memo(() => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm">
    <span className="text-muted-foreground text-sm">
      Made with ❤️ by{" "}
      <Link
        href={LINKEDIN_URL}
        target="_blank"
        className="text-primary underline hover:text-primary/80 transition-colors"
        aria-label="About us"
      >
        {SITE_AUTHOR?.toLowerCase()}
      </Link>
    </span>
    <span className="text-muted-foreground text-sm hidden sm:block">{"|"}</span>
    <span className="text-muted-foreground text-sm">
      {/* © {CURRENT_YEAR} {SITE_NAME} {SITE_SUB_TITLE} Inc. All rights reserved. */}
      The source code is available on{" "}
      <Link
        target="_blank"
        href={GITHUB_URL}
        className="text-primary underline hover:text-primary/80 transition-colors"
        aria-label="GitHub"
      >
        GitHub
      </Link>
      .
    </span>
  </div>
));

LegalLinks.displayName = "LegalLinks";

export default function Footer() {
  return (
    <footer className="bg-muted border-t px-4 shadow-2xl transition-all duration-300">
      <div className="mx-auto xl:mx-20">
        <div className="py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex items-center justify-center">
              <Logo
                text={SITE_NAME}
                subText={SITE_SUB_TITLE}
                size="sm"
                iconVariant="ghost"
                hideText={true}
                iconClassName="m-0 p-0"
              />
            </div>

            {/* Center: Legal Links */}
            <LegalLinks />

            {/* Right: Social Links */}
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
