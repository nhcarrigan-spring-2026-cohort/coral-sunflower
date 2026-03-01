import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, htmlFor, "aria-label": ariaLabel, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      aria-label={ariaLabel}
      className={cn(
        "gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className,
      )}
      data-slot="label"
      htmlFor={htmlFor}
      {...props}
    />
  );
}

export { Label };
