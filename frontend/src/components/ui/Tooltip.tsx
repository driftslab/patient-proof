"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className = "" }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div 
        className={cn(
          "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1.5 text-[9px] font-mono text-muted-foreground bg-[#080c18] border border-border rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50",
          className,
        )}
      >
        {content}
      </div>
    </div>
  );
}
export default Tooltip;
