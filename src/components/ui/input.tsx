import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-[#444] transition-all placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-[#285b63] focus-visible:ring-1 focus-visible:ring-[#285b63] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-1 aria-invalid:ring-red-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
