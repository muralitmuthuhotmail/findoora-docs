import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

// Types
interface SectionLayoutProps {
  children: ReactNode;
  className?: string;
  variant?: "fullscreen" | "contained" | "compact";
  spacing?: "tight" | "normal" | "loose";
  align?: "left" | "center" | "right";
  background?: "transparent" | "card" | "muted";
  id?: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: "left" | "center" | "right";
}

interface SectionContentProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

// Main Section Layout Component
const SectionLayout = forwardRef<HTMLElement, SectionLayoutProps>(
  (
    {
      children,
      className,
      variant = "fullscreen",
      spacing = "tight",
      align = "center",
      background = "transparent",
      id,
    },
    ref,
  ) => {
    const sectionClasses = cn(
      // Base styles
      "flex flex-col text-foreground",
      // Variant styles
      {
        "min-h-screen justify-center items-center py-12":
          variant === "fullscreen",
        "py-16 md:py-20": variant === "contained",
        "py-8 md:py-12": variant === "compact",
      },
      // Spacing styles
      {
        "space-y-8": spacing === "tight",
        "space-y-14": spacing === "normal",
        "space-y-20": spacing === "loose",
      },
      // Alignment styles
      {
        "items-start text-left": align === "left",
        "items-center text-center": align === "center",
        "items-end text-right": align === "right",
      },
      // Background styles
      {
        "bg-transparent": background === "transparent",
        "bg-card": background === "card",
        "bg-muted": background === "muted",
      },
      className,
    );

    return (
      <section ref={ref} id={id} className={sectionClasses}>
        {children}
      </section>
    );
  },
);

SectionLayout.displayName = "SectionLayout";

// Section Header Component
const SectionHeader = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  align = "center",
}: SectionHeaderProps) => {
  const headerClasses = cn(
    "w-full space-y-4 md:space-y-6",
    {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    },
    className,
  );

  const titleClasses = cn(
    "text-2xl sm:text-3xl md:text-4xl font-semibold",
    titleClassName,
  );

  const subtitleClasses = cn(
    "text-lg sm:text-xl text-muted-foreground max-w-2xl",
    {
      "mx-auto": align === "center",
      "ml-auto": align === "right",
    },
    subtitleClassName,
  );

  return (
    <div className={headerClasses}>
      <h1 className={titleClasses}>{title}</h1>
      {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
    </div>
  );
};

// Section Content Component
const SectionContent = ({
  children,
  className,
  maxWidth = "full",
}: SectionContentProps) => {
  const contentClasses = cn(
    "w-full",
    {
      "max-w-sm mx-auto": maxWidth === "sm",
      "max-w-md mx-auto": maxWidth === "md",
      "max-w-lg mx-auto": maxWidth === "lg",
      "max-w-xl mx-auto": maxWidth === "xl",
      "max-w-2xl mx-auto": maxWidth === "2xl",
      "w-full": maxWidth === "full",
    },
    className,
  );

  return <div className={contentClasses}>{children}</div>;
};

// Grid Layout for content sections
interface SectionGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const SectionGrid = ({
  children,
  cols = 1,
  gap = "md",
  className,
}: SectionGridProps) => {
  const gridClasses = cn(
    "grid w-full",
    {
      "grid-cols-1": cols === 1,
      "grid-cols-1 md:grid-cols-2": cols === 2,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": cols === 3,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": cols === 4,
    },
    {
      "gap-4": gap === "sm",
      "gap-8": gap === "md",
      "gap-12": gap === "lg",
    },
    className,
  );

  return <div className={gridClasses}>{children}</div>;
};

// Two-column layout for content with sidebar
interface SectionTwoColumnProps {
  children: ReactNode;
  sidebar: ReactNode;
  sidebarPosition?: "left" | "right";
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const SectionTwoColumn = ({
  children,
  sidebar,
  sidebarPosition = "left",
  gap = "md",
  className,
}: SectionTwoColumnProps) => {
  const containerClasses = cn(
    "flex flex-col md:flex-row w-full",
    {
      "gap-6": gap === "sm",
      "gap-12": gap === "md",
      "gap-16": gap === "lg",
    },
    className,
  );

  const sidebarClasses = cn("max-w-sm", {
    "order-first": sidebarPosition === "left",
    "order-last": sidebarPosition === "right",
  });

  const contentClasses = "w-full";

  return (
    <div className={containerClasses}>
      {sidebarPosition === "left" ? (
        <>
          <div className={sidebarClasses}>{sidebar}</div>
          <div className={contentClasses}>{children}</div>
        </>
      ) : (
        <>
          <div className={contentClasses}>{children}</div>
          <div className={sidebarClasses}>{sidebar}</div>
        </>
      )}
    </div>
  );
};

export {
  SectionLayout,
  SectionHeader,
  SectionContent,
  SectionGrid,
  SectionTwoColumn,
  type SectionLayoutProps,
  type SectionHeaderProps,
  type SectionContentProps,
  type SectionGridProps,
  type SectionTwoColumnProps,
};
