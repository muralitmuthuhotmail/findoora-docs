"use client";

import { SplashScreen } from "@/components/splash-screen";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen show={showSplash} />}
      {children}
    </>
  );
}
