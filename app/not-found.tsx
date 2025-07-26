"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex lg:min-h-[calc(80vh)] items-center justify-center lg:bg-muted/70 lg:rounded-xl">
      <div className="text-center space-y-8 p-8">
        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-muted-foreground/30">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or doesn&apos;t exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="min-w-[120px]"
          >
            Go Back
          </Button>
          <Button className="min-w-[120px]">
            <Link className="mr-2" href="/">
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
