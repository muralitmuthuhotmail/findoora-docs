"use client";

import { useEffect } from "react";
import {
  CLSMetric,
  FCPMetric,
  LCPMetric,
  TTFBMetric,
  INPMetric,
} from "web-vitals";
import { GOOGLE_ANALYTICS_ID, ENABLE_ANALYTICS } from "@/lib/config";

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== "undefined" && "web-vitals" in window === false) {
      import("web-vitals").then((webVitals) => {
        webVitals.onCLS(sendToAnalytics);
        webVitals.onFCP(sendToAnalytics);
        webVitals.onLCP(sendToAnalytics);
        webVitals.onTTFB(sendToAnalytics);
        webVitals.onINP(sendToAnalytics);
      });
    }
  }, []);

  return null;
}

function sendToAnalytics(
  metric: CLSMetric | FCPMetric | LCPMetric | TTFBMetric | INPMetric,
) {
  // Log in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("Web Vitals:", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Send to Vercel Analytics if available
  if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined" && window.va) {
      window.va("event", {
        eventName: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }
  }

  // Send to Google Analytics if configured
  if (
    ENABLE_ANALYTICS &&
    GOOGLE_ANALYTICS_ID &&
    typeof window !== "undefined" &&
    window.gtag
  ) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      non_interaction: true,
      custom_parameters: {
        metric_delta: metric.delta,
        metric_rating: metric.rating,
      },
    });
  }
}
