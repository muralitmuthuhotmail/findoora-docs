"use client";

import { TopLoadingBar } from "@/components/ui/top-loading-bar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ManualLoadingTrigger() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {isLoading && <TopLoadingBar height={4} />}
      <Button onClick={triggerLoading} disabled={isLoading}>
        {isLoading ? "Loading..." : "Test Loading Bar"}
      </Button>
    </div>
  );
}
