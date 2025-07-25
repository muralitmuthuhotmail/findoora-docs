import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const loadingSpinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "h-8 w-8",
      sm: "h-4 w-4",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LoadingSpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof loadingSpinnerVariants> {}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        className={cn("flex center w-full h-full justify-center items-center")}
      >
        <LoaderIcon
          className={cn(loadingSpinnerVariants({ size, className }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner, loadingSpinnerVariants };
