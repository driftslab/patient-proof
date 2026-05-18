import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none";

  const variants = {
    default: "bg-secondary text-secondary-foreground border border-border",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 glow-text-verified",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20 glow-text-stellar",
    outline: "text-foreground border border-border bg-transparent",
  };

  return <div className={cn(baseStyle, variants[variant], className)} {...props} />;
}
export default Badge;
