import {
  MobileNavigation,
  NavigationItem,
} from "@/components/layout/mobile-navigation";
import { SearchButton } from "@/components/layout/search-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { GITHUB_URL, SITE_NAME, SITE_SUB_TITLE } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface AppBarProps {
  className?: string;
  hasBlur?: boolean;
  isSticky?: boolean;
  navigationData?: NavigationItem[];
}

export function AppBar({
  className,
  hasBlur = false,
  isSticky = true,
  navigationData = [],
}: AppBarProps) {
  const containerClasses = cn(
    "flex w-full items-center justify-center p-3 bg-background border-b-2 border-border",
    hasBlur && "backdrop-blur bg-muted/90",
    isSticky && "sticky top-0",
    "z-50 border-b border-border/40",
    "transition-all duration-200",
    className,
  );

  const innerContainerClasses = cn(
    "flex items-center justify-between w-full mx-auto xl:mx-20 transition-all duration-200 ease-in-out lg:px-2",
    "gap-4",
  );

  return (
    <header className={containerClasses} role="banner" aria-label="Site header">
      <div className={innerContainerClasses}>
        {/* Mobile Menu Button and Logo */}
        <Link
          className="flex items-center gap-2 lg:hidden"
          href="/"
          aria-label="Navigate to homepage"
        >
          <Logo
            iconVariant="gradient"
            text={SITE_NAME}
            interactive
            aria-label="Navigate to homepage"
          />
        </Link>

        {/* Desktop Logo */}
        <Link
          className="hidden lg:flex flex-shrink-0 pl-2"
          href="/"
          aria-label="Navigate to homepage"
        >
          <Logo
            iconVariant="gradient"
            text={SITE_NAME}
            subText={SITE_SUB_TITLE}
            interactive
            aria-label="Navigate to homepage"
          />
        </Link>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="w-full relative">
            <SearchButton
              variant="outline"
              className="w-full justify-start text-muted-foreground"
              aria-label="Search documentation"
            >
              <Search className="h-4 w-4" />
              Search...
              <span className="ml-auto text-xs text-muted-foreground border-border border-1 px-1 rounded-sm bg-muted">
                ⌘K
              </span>
            </SearchButton>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <SearchButton
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <Search />
          </SearchButton>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Link */}
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer inline-flex"
              aria-label="View on GitHub"
            >
              <FaGithub />
              GitHub
            </a>
          </Button>
          <MobileNavigation navigationData={navigationData} />
        </div>
      </div>
    </header>
  );
}
