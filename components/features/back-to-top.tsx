"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      size={"sm"}
      onClick={scrollToTop}
      className={cn(
        "sticky !px-4 bottom-6 z-50 shadow-lg hover:shadow-xl rounded-full justify-center items-center p-2 transition-all duration-300 mt-10",
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-3 w-3" /> Scroll to Top
    </Button>
  );
}
