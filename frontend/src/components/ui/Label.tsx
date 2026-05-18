import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-default select-none",
          className,
        )}
        {...props}
      />
    );
  },
);
Label.displayName = "Label";
export default Label;
