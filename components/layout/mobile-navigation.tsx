"use client";

import { NavigationSidebar } from "@/components/layout/navigation-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GITHUB_URL } from "@/lib/config";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

export interface NavigationItem {
  title: string;
  url: string;
  items?: NavigationItem[] | null;
}

interface MobileNavigationProps {
  navigationData: NavigationItem[];
}

export function MobileNavigation({ navigationData }: MobileNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader className="text-left mx-2">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through our documentation.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <NavigationSidebar
              navigationData={navigationData}
              className="p-4 overflow-y-auto"
              onNavigate={handleNavigate}
            />
          </div>
          <div className="p-4 pb-5 flex flex-col border-t-1 gap-3 justify-center items-baseline mt-auto bg-muted/50">
            <Button variant="gradient" className="w-full" asChild>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
              >
                <FaGithub /> View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
