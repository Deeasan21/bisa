import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-semibold transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bisa-gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--foreground)] text-[var(--background)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:brightness-110",
        destructive:
          "bg-[var(--destructive)] text-white shadow-[var(--shadow-sm)] hover:brightness-110",
        outline:
          "border border-[var(--border-default)] bg-[var(--surface)] shadow-[var(--shadow-xs)] hover:bg-[var(--background-secondary)] hover:border-[var(--border-emphasis)]",
        secondary:
          "bg-[var(--background-secondary)] text-[var(--foreground)] shadow-[var(--shadow-xs)] hover:bg-[var(--border-default)]",
        ghost:
          "hover:bg-[var(--background-secondary)] hover:text-[var(--foreground)]",
        link:
          "text-[var(--foreground)] underline-offset-4 hover:underline",
        // Bisa-specific variants
        warm:
          "bg-[var(--bisa-gold)] text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:brightness-105",
        "warm-outline":
          "border-2 border-[var(--bisa-gold)] text-[var(--bisa-gold-dark)] bg-[var(--bisa-gold-subtle)] hover:bg-[var(--bisa-gold-light)]",
        mode:
          "bg-[var(--mode-color)] text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:brightness-105 rounded-[var(--radius-lg)]",
        soft:
          "bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:bg-[var(--border-subtle)] rounded-[var(--radius-full)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
        lg: "h-12 rounded-[var(--radius-md)] px-8 text-base",
        xl: "h-14 rounded-[var(--radius-lg)] px-10 text-base font-bold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
