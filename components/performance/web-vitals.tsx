"use client";

import { useEffect } from "react";
import {
  CLSMetric,
  FCPMetric,
  LCPMetric,
  TTFBMetric,
  INPMetric,
} from "web-vitals";

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
  // Only log in development
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    console.log("Web Vitals:", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // In production, send to your analytics service
  // Example: gtag('event', metric.name, { value: metric.value });
}
