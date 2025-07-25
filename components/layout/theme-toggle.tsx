"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = useMemo(
    () => [
      {
        key: "light",
        label: "Light",
        icon: <Sun className="w-8 h-8" />,
      },
      {
        key: "dark",
        label: "Dark",
        icon: <Moon className="w-8 h-8" />,
      },
      {
        key: "system",
        label: "System",
        icon: <LaptopMinimal className="w-8 h-8" />,
      },
    ],
    [],
  );

  const handleSetTheme = useCallback(
    (key: string) => {
      setTheme(key);
    },
    [setTheme],
  );

  const renderIcon = useMemo(() => {
    if (!mounted) return null;
    const iconClass = cn(""); // Increased size to match lucide-react (typically 24px)
    switch (theme) {
      case "dark":
        return <Moon className={iconClass} />;
      case "light":
        return <Sun className={iconClass} />;
      default:
        return <LaptopMinimal className={iconClass} />;
    }
  }, [theme, mounted]);

  return (
    <div className={cn("flex-shrink-0", className)}>
      <Dialog open={open} onOpenChange={setOpen} modal={true}>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" className="p-0">
            <span className="sr-only">Toggle theme</span>
            {renderIcon}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="mb-4">Theme Settings</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mb-4">
              Choose your preferred theme. You can switch between Light, Dark,
              and System themes.
            </DialogDescription>
            <div className="flex flex-row gap-4 justify-between mb-6">
              {themeOptions.map((option) => (
                <button
                  key={option.key}
                  className={cn(
                    `flex flex-col justify-center items-center bg-accent text-accent-foreground rounded-xl p-4 w-full gap-2 border border-border`,
                    mounted && theme === option.key
                      ? " ring-1 ring-primary"
                      : "",
                  )}
                  onClick={() => handleSetTheme(option.key)}
                  aria-label={`Set ${option.label.toLowerCase()} theme`}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
