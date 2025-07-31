"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Terminal, TrafficCone } from "lucide-react";
import Link from "next/link";
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
          {process.env.NEXT_PUBLIC_NODE_ENV !== "production" && (
            <Alert variant={"destructive"} className="mt-4">
              <TrafficCone />
              <AlertTitle className="text-left">Error Details (Development Only)</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="outline">
            Try Again
          </Button>
          <Button>
            <Link href={"/"}>Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
