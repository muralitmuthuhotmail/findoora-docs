"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/components/analytics/google-analytics";

function PageViewTrackerImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerImpl />
    </Suspense>
  );
}
