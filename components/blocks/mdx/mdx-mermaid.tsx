"use client";

import { useEffect, useRef, useId } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";
import { cn } from "@/lib/utils";

interface MermaidProps {
  children: string;
  className?: string;
}

export function Mermaid({ children, className }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const renderMermaid = async () => {
      if (!ref.current) return;

      // Determine theme based on resolved theme
      const theme = resolvedTheme === "dark" ? "dark" : "default";

      mermaid.initialize({
        startOnLoad: false,
        theme,
        securityLevel: "loose",
        themeVariables: {
          // Additional theme customization for dark mode
          ...(resolvedTheme === "dark" && {
            primaryColor: "#3b82f6",
            primaryTextColor: "#e5e7eb",
            primaryBorderColor: "#6b7280",
            lineColor: "#6b7280",
            secondaryColor: "#374151",
            tertiaryColor: "#1f2937",
            background: "#111827",
            mainBkg: "#1f2937",
            secondBkg: "#374151",
            tertiaryBkg: "#4b5563",
          }),
        },
      });

      try {
        // Clear before rendering
        ref.current.innerHTML = "";
        const { svg } = await mermaid.render(`mermaid-${id}`, children);
        ref.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render error:", error);
        ref.current.innerHTML = `
          <div class="text-red-500 p-4 border border-red-300 rounded">
            Error rendering Mermaid diagram:<br/>${String(error)}
          </div>`;
      }
    };

    renderMermaid();
  }, [children, id, resolvedTheme]);

  return (
    <div
      ref={ref}
      className={cn(
        `overflow-auto py-2 flex justify-center item-center`,
        className,
      )}
    />
  );
}
