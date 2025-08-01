import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CTAAction {
  label: string;
  href: string;
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
}: CTACardProps) {
  return (
    <Card className={cn(`rounded-xl p-6 gap-3 shadow-none`, className)}>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex flex-col gap-2 justify-start items-start">
        {actions.map((action, index) => (
          <Link
            key={index}
            className="inline-flex items-center justify-center text-sm underline-offset-3 no-underline hover:underline transition-all duration-200"
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
          >
            {action.label}
            {action.external && (
              <ArrowUpRight className="w-4 h-4 mb-0 pt-1 items-center" />
            )}
          </Link>
        ))}
      </div>
    </Card>
  );
}
