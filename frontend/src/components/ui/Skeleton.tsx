import { cn } from "@/lib/utils/cn";
import * as React from "react";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("shimmer-loading rounded-md bg-[#080c18]/50 border border-border/30", className)}
      {...props}
    />
  );
}
export default Skeleton;
