import * as React from "react"

import { cn } from "@/lib/utils"

const buttonBaseClasses =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const buttonVariantClasses = {
  default: "bg-primary text-white hover:bg-primary/90",
  destructive: "bg-red-600 text-white hover:bg-red-600/90 focus-visible:ring-red-600/30",
  outline: "border border-white/15 bg-transparent hover:bg-white/10",
  secondary: "bg-white/10 text-foreground hover:bg-white/15",
  ghost: "hover:bg-white/10",
  link: "text-primary underline-offset-4 hover:underline",
} as const

const buttonSizeClasses = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9",
  "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
} as const

type ButtonVariant = keyof typeof buttonVariantClasses
type ButtonSize = keyof typeof buttonSizeClasses

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  // asChild is accepted for API compatibility with call sites that pass it,
  // but this component only ever renders a <button>.
  void asChild

  return (
    <button
      type={type}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

export { Button }
