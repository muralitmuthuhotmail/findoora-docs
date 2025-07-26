"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string;
  className?: string;
  containerClassName?: string;
}

export function LazyImage({
  src,
  alt,
  fallback = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+TG9hZGluZy4uLjwvdGV4dD4KICA8L3N2Zz4=",
  className,
  containerClassName,
  ...props
}: LazyImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {hasError ? (
        <div className="flex items-center justify-center bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% bg-no-repeat h-full w-full">
          <span className="text-sm"></span>
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            onError={handleError}
            className={cn("transition-opacity", className)}
            placeholder="blur"
            blurDataURL={fallback}
            {...props}
          />
        </>
      )}
    </div>
  );
}
