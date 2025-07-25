"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex lg:min-h-[calc(80vh)] items-center justify-center lg:bg-muted/70 lg:rounded-xl">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </p>
          {process.env.NEXT_PUBLIC_NODE_ENV === "development" && (
            <details className="text-left bg-muted p-4 rounded-md">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="outline">
            Try Again
          </Button>
          <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
        </div>
      </div>
    </div>
  );
}
