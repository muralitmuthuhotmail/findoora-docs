"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GOOGLE_ANALYTICS_ID, ENABLE_ANALYTICS } from "@/lib/config";
/* eslint-disable */
// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>,
    ) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  // Don't render anything if analytics is disabled or no ID is provided
  if (!ENABLE_ANALYTICS || !GOOGLE_ANALYTICS_ID) {
    return null;
  }

  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined" && !window.dataLayer) {
      window.dataLayer = [];
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            anonymize_ip: true,
            allow_google_signals: false,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

// Analytics tracking functions
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>,
) => {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    ENABLE_ANALYTICS &&
    GOOGLE_ANALYTICS_ID
  ) {
    window.gtag("event", eventName, {
      event_category: parameters?.category || "engagement",
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters,
    });
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    ENABLE_ANALYTICS &&
    GOOGLE_ANALYTICS_ID
  ) {
    window.gtag("config", GOOGLE_ANALYTICS_ID, {
      page_location: url,
      page_title: title || document.title,
    });
  }
};

export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent("search", {
    search_term: searchTerm,
    category: "search",
    label: "documentation_search",
    value: resultsCount,
  });
};

export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
    category: "downloads",
  });
};

export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent("click", {
    event_category: "outbound",
    event_label: url,
    transport_type: "beacon",
    link_text: linkText,
  });
};

export const trackContentView = (contentType: string, contentId: string) => {
  trackEvent("page_view", {
    content_type: contentType,
    content_id: contentId,
    category: "content",
  });
};

export const trackSocialShare = (platform: string, url: string) => {
  trackEvent("share", {
    method: platform,
    content_type: "documentation",
    item_id: url,
    category: "social",
  });
};
