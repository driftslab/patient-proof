"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  address?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ className, address, size = "md", ...props }: AvatarProps) {
  // Generate a deterministic color and initial based on public address G... key
  const fallbackLetters = address ? address.substring(1, 3).toUpperCase() : "VM";
  const colors = [
    "bg-blue-600/30 text-blue-400 border-blue-500/30",
    "bg-emerald-600/30 text-emerald-400 border-emerald-500/30",
    "bg-purple-600/30 text-purple-400 border-purple-500/30",
    "bg-pink-600/30 text-pink-400 border-pink-500/30",
    "bg-amber-600/30 text-amber-400 border-amber-500/30",
    "bg-indigo-600/30 text-indigo-400 border-indigo-500/30",
    "bg-teal-600/30 text-teal-400 border-teal-500/30",
  ];

  const sum = address
    ? address.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 42;
  const selectedColor = colors[sum % colors.length];

  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full items-center justify-center font-bold border select-none",
        sizes[size],
        selectedColor,
        className,
      )}
      {...props}
    >
      {fallbackLetters}
    </div>
  );
}
export default Avatar;
