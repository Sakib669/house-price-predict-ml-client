import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[] | string[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, options, children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-[#ededf2]/90 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              "flex h-11 w-full appearance-none rounded-lg border border-[#1e293b] bg-[#101733] px-3.5 py-2 text-sm text-white transition-all focus:border-[#0000F2] focus:bg-[#131b3e] focus:outline-none focus:ring-1 focus:ring-[#0000F2] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          >
            {options
              ? options.map((opt) => {
                  const val = typeof opt === "string" ? opt : opt.value;
                  const lbl = typeof opt === "string" ? opt : opt.label;
                  return (
                    <option
                      key={val}
                      value={val}
                      className="bg-[#0b0f22] text-[#ededf2] py-1"
                    >
                      {lbl}
                    </option>
                  );
                })
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94a3b8]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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
Select.displayName = "Select";
