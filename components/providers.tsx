"use client";

import { ReactNode, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toaster } from "@/components/ui/sonner";
import { WebVitals } from "@/components/performance/web-vitals";
import { SearchProvider } from "@/components/providers/search-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SearchProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <WebVitals />
        </Suspense>
        {children}
        <Toaster />
      </SearchProvider>
    </ThemeProvider>
  );
}
