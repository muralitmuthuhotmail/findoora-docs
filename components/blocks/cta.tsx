import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CTAAction {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
  external?: boolean;
}

interface CTACardProps {
  title: string;
  description: string;
  actions: CTAAction[];
  className?: string;
  variant?: "default" | "feedback" | "support";
}

export function CTACard({
  title,
  description,
  actions,
  className = "",
  variant = "default",
}: CTACardProps) {
  const variantStyles = {
    default: "border bg-background",
    feedback: "border border-border bg-muted/60",
    support: "border border-border bg-muted/50",
  };

  return (
    <Card
      className={cn(`rounded-lg p-6 gap-3 shadow-xl ${variantStyles[variant]}`,className)}
    >
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-3 justify-between">
        {actions.map((action, index) => (
          <Button
            key={index}
            asChild
            variant={action.variant}
            className="flex items-center"
          >
            <Link
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
            >
              {action.label}
              {action.external && <ExternalLink className="ml-2 h-4 w-4" />}
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
}
