import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-emerald-200 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 aria-invalid:ring-red-200 aria-invalid:border-red-400 bg-white/80 backdrop-blur flex field-sizing-content min-h-16 w-full rounded-lg border px-3 py-2 text-base natural-shadow transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        className
      )}
      {...props} />
  );
}

export { Textarea }
