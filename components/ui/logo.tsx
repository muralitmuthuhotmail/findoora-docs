"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LibraryBigIcon, type LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";

// Size configurations
type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";
type IconVariant = "default" | "secondary" | "outline" | "ghost" | "gradient";
type IconShape = "square" | "rounded" | "circle";
type TextWeight = "normal" | "medium" | "semibold" | "bold";
type Orientation = "horizontal" | "vertical";

// Style configuration objects
const sizeConfig = {
  xs: {
    gap: "gap-1.5",
    iconSize: "size-6",
    textSize: "text-base",
    innerIcon: "size-3",
  },
  sm: {
    gap: "gap-2",
    iconSize: "size-6",
    textSize: "text-lg",
    innerIcon: "size-4",
  },
  md: {
    gap: "gap-2.5",
    iconSize: "size-8",
    textSize: "text-xl",
    innerIcon: "size-4",
  },
  lg: {
    gap: "gap-3",
    iconSize: "size-12",
    textSize: "text-2xl",
    innerIcon: "size-6",
  },
  xl: {
    gap: "gap-3.5",
    iconSize: "size-16",
    textSize: "text-3xl",
    innerIcon: "size-8",
  },
} as const;

const iconVariantConfig = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border-2 border-primary text-primary bg-transparent",
  ghost: "bg-transparent text-foreground",
  gradient:
    "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
} as const;

const iconShapeConfig = {
  square: "rounded-sm",
  rounded: "rounded-lg",
  circle: "rounded-full",
} as const;

const textWeightConfig = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The size of the logo
   * @default "sm"
   */
  size?: LogoSize;

  /**
   * The orientation of the logo
   * @default "horizontal"
   */
  orientation?: Orientation;

  /**
   * Whether the logo should have interactive hover effects
   * @default false
   */
  interactive?: boolean;

  /**
   * The text to display alongside the icon
   * @default "Findoora Inc."
   */
  text?: string;

  /**
   * The subtext to display below the main text
   * @default "Docs"
   */
  subText?: string;

  /**
   * Whether to hide the text and show only the icon
   * @default false
   */
  hideText?: boolean;

  /**
   * The icon component to use (Lucide icon or custom component)
   * @default GalleryVerticalEnd
   */
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;

  /**
   * Visual variant of the icon container
   * @default "default"
   */
  iconVariant?: IconVariant;

  /**
   * Shape of the icon container
   * @default "square"
   */
  iconShape?: IconShape;

  /**
   * Font weight of the text
   * @default "medium"
   */
  textWeight?: TextWeight;

  /**
   * Custom icon class name
   */
  iconClassName?: string;

  /**
   * Custom text class name
   */
  textClassName?: string;

  /**
   * Whether the logo should be rendered as a link
   * @default false
   */
  asLink?: boolean;

  /**
   * URL for the link (only used when asLink is true)
   * @default "#"
   */
  href?: string;

  /**
   * Link target (only used when asLink is true)
   */
  target?: string;

  /**
   * Link rel attribute (only used when asLink is true)
   */
  rel?: string;

  /**
   * Accessible label for screen readers
   */
  "aria-label"?: string;
}

export const Logo = forwardRef<HTMLAnchorElement & HTMLDivElement, LogoProps>(
  (
    {
      text = "findoora",
      subText,
      hideText = false,
      icon: IconComponent = LibraryBigIcon,
      size = "sm",
      orientation = "horizontal",
      interactive = false,
      iconVariant = "default",
      iconShape = "square",
      textWeight = "bold",
      iconClassName,
      textClassName,
      className,
      asLink = false,
      href = "/",
      target,
      rel,
      "aria-label": ariaLabel,
      onClick,
      ...props
    },
    ref,
  ) => {
    const Component = asLink ? "a" : "div";
    const isInteractive = interactive || asLink || !!onClick;

    // Get size configuration
    const sizeStyles = sizeConfig[size];

    // Build class names
    const logoClasses = cn(
      "inline-flex items-center font-medium transition-all duration-200 ease-in-out",
      sizeStyles.gap,
      orientation === "vertical" ? "flex-col" : "flex-row",
      isInteractive &&
        "opacity-90 hover:opacity-80 active:scale-95 cursor-pointer",
      className,
    );

    const iconClasses = cn(
      "flex items-center justify-center transition-all duration-200",
      sizeStyles.iconSize,
      iconVariantConfig[iconVariant],
      iconShapeConfig[iconShape],
      iconClassName,
    );

    const textClasses = cn(
      "transition-colors duration-200",
      sizeStyles.textSize,
      textWeightConfig[textWeight],
      textClassName,
    );

    const linkProps = asLink
      ? {
          href,
          target,
          rel: target === "_blank" ? "noopener noreferrer" : rel,
        }
      : {};

    const accessibilityProps = {
      "aria-label": ariaLabel || (hideText ? text : undefined),
      role: isInteractive ? "button" : undefined,
      tabIndex: isInteractive ? 0 : undefined,
    };

    return (
      <Component
        ref={ref}
        className={logoClasses}
        onClick={onClick}
        {...linkProps}
        {...accessibilityProps}
        {...props}
      >
        <div className={iconClasses} aria-hidden={!hideText}>
          <IconComponent className={sizeStyles.innerIcon} />
        </div>

        {!hideText && <span className={textClasses}>{text}</span>}
        {!hideText && subText && (
          <Badge className="text-x bg-blue-300/50">{subText}</Badge>
        )}
      </Component>
    );
  },
);

Logo.displayName = "Logo";

export default Logo;
