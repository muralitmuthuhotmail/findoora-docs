import type { ContentPost } from "@/types/content.types";
import type { Metadata } from "next";

import {
  BASE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_AUTHOR,
  SITE_CREATOR,
  SITE_PUBLISHER,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_LOCALE,
  DEFAULT_ROBOTS_INDEX,
  DEFAULT_ROBOTS_FOLLOW,
  DEFAULT_ROBOTS_GOOGLEBOT_INDEX,
  DEFAULT_ROBOTS_GOOGLEBOT_FOLLOW,
  DEFAULT_ROBOTS_GOOGLEBOT_MAX_VIDEO_PREVIEW,
  DEFAULT_ROBOTS_GOOGLEBOT_MAX_IMAGE_PREVIEW,
  DEFAULT_ROBOTS_GOOGLEBOT_MAX_SNIPPET,
  TWITTER_CREATOR_HANDLE,
} from "@/lib/config";
const baseUrl = BASE_URL;
const siteName = SITE_NAME;
const siteDescription = SITE_DESCRIPTION;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `${siteName} | %s`,
  },
  description: siteDescription,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_CREATOR,
  publisher: SITE_PUBLISHER,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: DEFAULT_OG_LOCALE,
    url: baseUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [DEFAULT_OG_IMAGE],
    creator: TWITTER_CREATOR_HANDLE,
  },
  robots: {
    index: DEFAULT_ROBOTS_INDEX,
    follow: DEFAULT_ROBOTS_FOLLOW,
    googleBot: {
      index: DEFAULT_ROBOTS_GOOGLEBOT_INDEX,
      follow: DEFAULT_ROBOTS_GOOGLEBOT_FOLLOW,
      "max-video-preview": DEFAULT_ROBOTS_GOOGLEBOT_MAX_VIDEO_PREVIEW,
      "max-image-preview": DEFAULT_ROBOTS_GOOGLEBOT_MAX_IMAGE_PREVIEW,
      "max-snippet": DEFAULT_ROBOTS_GOOGLEBOT_MAX_SNIPPET,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export function generateContentPostMetadata(post: ContentPost): Metadata {
  const { title, summary, publishedAt, thumbnail, category } = post.metadata;
  const url = `${baseUrl}/${category}/${post.slug}`;
  const ogImage = thumbnail || DEFAULT_OG_IMAGE;

  return {
    title,
    description: summary,
    keywords: SITE_KEYWORDS,
    authors: [{ name: SITE_AUTHOR }],
    openGraph: {
      type: "article",
      locale: DEFAULT_OG_LOCALE,
      url,
      title,
      description: summary,
      siteName,
      publishedTime: publishedAt,
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [ogImage],
      creator: TWITTER_CREATOR_HANDLE,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = "",
): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: DEFAULT_OG_LOCALE,
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: TWITTER_CREATOR_HANDLE,
    },
    alternates: {
      canonical: url,
    },
  };
}
