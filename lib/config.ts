// Centralized configuration for Findoora Docs
// Add or update config values here as needed

// Base URLs
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://findoora-docs.vercel.app";
export const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || `${BASE_URL}`;

// Social links
export const GITHUB_URL =
  "https://github.com/muralitmuthuhotmail/findoora-docs";
export const GITHUB_ISSUES_URL =
  "https://github.com/muralitmuthuhotmail/findoora-docs/issues";
export const TWITTER_URL = "https://twitter.com/findoora";
export const INSTAGRAM_URL = "https://instagram.com/findoora";
export const LINKEDIN_URL = "https://www.linkedin.com/in/murali-thangamuthu";

// Site info
export const SITE_NAME = "findoora";
export const SITE_SUB_TITLE = "docs";
export const SITE_DESCRIPTION =
  "Findoora is a modern documentation platform built with Next.js and shadcn/ui";
export const SITE_KEYWORDS = [
  "Next.js",
  "React",
  "TypeScript",
  "Web Development",
  "Documentation",
  "Tailwind CSS",
  "shadcn/ui",
];
export const SITE_AUTHOR = "@muralitmuthuhotmail";
export const SITE_CREATOR = "@muralitmuthuhotmail";
export const SITE_PUBLISHER = "@muralitmuthuhotmail";

// SEO/Schema
// Media & Assets
export const DEFAULT_APP_LOGO_URL = `${BASE_URL}/logo.svg`;
export const DEFAULT_OG_IMAGE = `${BASE_URL}/logo.svg`;
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT = SITE_NAME;
export const DEFAULT_OG_IMAGE_TYPE = "image/png";
export const RSS_URL = "/rss.xml";
export const SHADCN_SCHEMA_URL = "https://ui.shadcn.com/schema.json";
export const SCHEMA_ORG_URL = "https://schema.org";

// Open Graph & Robots
export const DEFAULT_OG_LOCALE = "en_US";
export const DEFAULT_ROBOTS_INDEX = true;
export const DEFAULT_ROBOTS_FOLLOW = true;
export const DEFAULT_ROBOTS_GOOGLEBOT_INDEX = true;
export const DEFAULT_ROBOTS_GOOGLEBOT_FOLLOW = true;
export const DEFAULT_ROBOTS_GOOGLEBOT_MAX_VIDEO_PREVIEW = -1;
export const DEFAULT_ROBOTS_GOOGLEBOT_MAX_IMAGE_PREVIEW = "large";
export const DEFAULT_ROBOTS_GOOGLEBOT_MAX_SNIPPET = -1;

// Social Handles
export const TWITTER_CREATOR_HANDLE = "@findoora";
export const TWITTER_SITE_HANDLE = "@findoora";

// Verification Tokens
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";
export const DEFAULT_VERIFICATION_GOOGLE = GOOGLE_SITE_VERIFICATION;
export const DEFAULT_VERIFICATION_FACEBOOK = FACEBOOK_APP_ID;
export const DEFAULT_VERIFICATION_BING =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "";
export const DEFAULT_VERIFICATION_YANDEX =
  process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || "";
export const DEFAULT_VERIFICATION_ALIYUN =
  process.env.NEXT_PUBLIC_ALIYUN_SITE_VERIFICATION || "";
export const DEFAULT_VERIFICATION_TWITTER =
  process.env.NEXT_PUBLIC_TWITTER_SITE_VERIFICATION || "";

// Analytics Configuration
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const ENABLE_ANALYTICS =
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
