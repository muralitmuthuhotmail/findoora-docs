import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
  showIcon?: boolean;
}

export function ErrorMessage({
  title = "Error",
  message,
  className,
  showIcon = true,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border border-destructive/20 bg-destructive/10",
        className,
      )}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <AlertTriangle
          className="h-5 w-5 text-destructive flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-destructive">{title}</h3>
        <p className="text-sm text-destructive/80">{message}</p>
      </div>
    </div>
  );
}
