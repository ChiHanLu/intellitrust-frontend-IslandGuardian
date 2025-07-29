import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-slate-700 placeholder:text-slate-400 selection:bg-emerald-200 selection:text-emerald-800 bg-white/80 backdrop-blur border-emerald-200 flex h-10 w-full min-w-0 rounded-lg border px-3 py-2 text-base natural-shadow transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200",
        "aria-invalid:ring-red-200 aria-invalid:border-red-400",
        className
      )}
      {...props} />
  );
}

export { Input }
