import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariantClasses = {
  default: "border-transparent bg-primary text-white [a&]:hover:bg-primary/90",
  secondary: "border-transparent bg-white/10 text-foreground [a&]:hover:bg-white/15",
  destructive: "border-transparent bg-red-600 text-white [a&]:hover:bg-red-600/90",
  outline: "border-white/15 text-foreground [a&]:hover:bg-white/10",
} as const

type BadgeVariant = keyof typeof badgeVariantClasses

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant
  asChild?: boolean
}

function Badge({ className, variant = "default", asChild = false, ...props }: BadgeProps) {
  // asChild is accepted for API compatibility with call sites that pass it,
  // but this component only ever renders a <span>.
  void asChild

  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow]",
        badgeVariantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
