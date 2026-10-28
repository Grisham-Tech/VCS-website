import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F86531] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        // Primary CTA: orange → crimson gradient
        default:
          "bg-gradient-to-r from-[#F86531] to-[#C42F35] text-white font-semibold " +
          "hover:from-[#ff7340] hover:to-[#d93a40] " +
          "shadow-md shadow-[#F86531]/30 hover:shadow-lg hover:shadow-[#F86531]/50 " +
          "transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]",

        // Full brand sweep: orange → crimson → navy
        cosmic:
          "bg-gradient-to-r from-[#F86531] via-[#C42F35] to-[#13324F] text-white " +
          "hover:from-[#ff7340] hover:via-[#d93a40] hover:to-[#1a3f62] " +
          "shadow-lg shadow-[#F86531]/40 hover:shadow-lg hover:shadow-[#F86531]/50 hover:scale-105 " +
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",

        // Vibrant full-sweep with strong glow
        gradient:
          "bg-gradient-to-r from-[#F86531] via-[#C42F35] to-[#13324F] text-white " +
          "hover:from-[#ff7340] hover:via-[#d93a40] hover:to-[#1a3f62] " +
          "shadow-[0_0_20px_rgba(248,101,49,0.5)] hover:shadow-[0_0_30px_rgba(248,101,49,0.7),0_0_60px_rgba(248,101,49,0.4)] hover:scale-105",

        // Outlined, accessible on dark navy backgrounds
        outline:
          "border-2 border-[#F86531]/50 bg-transparent text-[#F86531] " +
          "hover:bg-[#F86531]/10 hover:border-[#F86531] hover:text-[#ff7340] " +
          "shadow-[0_0_10px_rgba(248,101,49,0.2)] hover:shadow-[0_0_20px_rgba(248,101,49,0.4)]",

        ghost: "hover:bg-[#F86531]/15 hover:text-[#F86531] text-slate-300",

        destructive:
          "bg-gradient-to-r from-[#C42F35] to-[#8b1a1e] text-white " +
          "hover:from-[#d93a40] hover:to-[#a01f24] " +
          "shadow-lg shadow-[#C42F35]/30 hover:shadow-xl hover:shadow-[#C42F35]/40",

        // High-visibility glow button
        glow:
          "bg-gradient-to-r from-[#F86531] to-[#C42F35] text-white " +
          "shadow-[0_0_30px_rgba(248,101,49,0.6),0_0_60px_rgba(248,101,49,0.4)] " +
          "hover:shadow-[0_0_40px_rgba(248,101,49,0.8),0_0_80px_rgba(248,101,49,0.5)] hover:scale-105",

        link: "text-[#F86531] underline-offset-4 hover:underline hover:text-[#ff7340]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-full px-4 text-sm",
        lg: "h-14 rounded-full px-10 text-lg",
        xl: "h-16 rounded-full px-12 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
