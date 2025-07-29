"use client";

import { LazyImage } from "@/components/ui/lazy-image";
import { cn } from "@/lib/utils";

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MDXImage({
  src,
  alt,
  width,
  height,
  className,
}: MDXImageProps) {
  return (
    <div className="my-8">
      {width && height ? (
        <LazyImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(`rounded-xl border`, className)}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      ) : (
        <img
          src={src || ""}
          alt={alt || ""}
          className={cn(`rounded border`, className)}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
