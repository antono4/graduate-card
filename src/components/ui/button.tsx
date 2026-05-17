import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base font-black uppercase ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 soft-brutalist-border soft-brutalist-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-black hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "bg-white text-black hover:bg-accent hover:text-white",
        secondary: "bg-secondary text-black hover:bg-secondary/90",
        ghost: "border-transparent shadow-none hover:bg-accent hover:border-black hover:shadow-sm",
        link: "border-none shadow-none text-black underline-offset-4 hover:underline p-0",
        accent: "bg-accent text-white hover:bg-accent/90",
      },
      size: {
        default: "h-12 sm:h-14 px-6 sm:px-8 py-2",
        sm: "h-10 px-4 text-xs sm:text-sm",
        lg: "h-16 sm:h-20 px-10 sm:px-12 text-xl sm:text-2xl",
        icon: "h-10 w-10 sm:h-12 sm:w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
