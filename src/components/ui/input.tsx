import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  unit?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, helperText, error, unit, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#ededf2]/90 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border border-[#1e293b] bg-[#101733] px-3.5 py-2 text-sm text-white placeholder:text-[#64748b] transition-all focus:border-[#0000F2] focus:bg-[#131b3e] focus:outline-none focus:ring-1 focus:ring-[#0000F2] disabled:cursor-not-allowed disabled:opacity-50",
              unit && "pr-12",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {unit && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-[#94a3b8] font-mono">
              {unit}
            </span>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#64748b]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
