"use client";

import { SplashScreen } from "@/components/splash-screen";
import { Suspense, useEffect, useState } from "react";
import { WebVitals } from "@/components/performance/web-vitals";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen show={showSplash} />}
      <Suspense fallback={<WebVitals />}>{children}</Suspense>
    </>
  );
}
