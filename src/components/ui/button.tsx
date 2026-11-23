"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060814] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#0000F2] text-white shadow-lg shadow-[#0000F2]/25 hover:bg-[#1414ff] hover:shadow-[#0000F2]/40 border border-[#0000F2]",
        secondary:
          "bg-[#131b38] text-[#EDEDF2] hover:bg-[#1a254c] border border-[#1e293b]",
        outline:
          "border border-[#1e293b] bg-transparent text-[#EDEDF2] hover:bg-[#121936] hover:border-[#0000F2]/60",
        ghost:
          "text-[#94a3b8] hover:text-white hover:bg-[#131b38]/50",
        cyan:
          "bg-[#00D2FF] text-[#060814] font-semibold hover:bg-[#38ddff] shadow-md shadow-[#00D2FF]/20",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-7 text-base font-semibold",
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
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
