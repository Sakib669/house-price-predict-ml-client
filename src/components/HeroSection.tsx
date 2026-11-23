"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Buildings, CurrencyDollar, TrendUp } from "@phosphor-icons/react";

interface HeroSectionProps {
  onScrollToForm: () => void;
  onSelectDefaultPreset: () => void;
}

export function HeroSection({ onScrollToForm, onSelectDefaultPreset }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 md:pt-14 md:pb-16 border-b border-[#1e293b]/50">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[280px] w-[500px] rounded-full bg-[#0000F2]/10 blur-[120px]" />
        <div className="h-[200px] w-[350px] rounded-full bg-[#00D2FF]/5 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0000F2]/40 bg-[#0000F2]/10 px-3 py-1 text-xs font-semibold text-[#00D2FF]">
              <TrendUp size={14} className="text-[#00D2FF]" />
              <span>Real Estate Intelligence Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Precision AI property valuation, computed in milliseconds.
            </h1>

            <p className="text-base text-[#94a3b8] max-w-[50ch] leading-relaxed">
              Estimate fair market value across 13 structural variables with our trained Random Forest regression pipeline.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                onClick={onScrollToForm}
                className="gap-2 font-semibold"
              >
                <span>Calculate Property Price</span>
                <ArrowDown size={16} />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onSelectDefaultPreset}
                className="gap-2"
              >
                <Buildings size={16} className="text-[#3b82f6]" />
                <span>Load Sample House</span>
              </Button>
            </div>
          </div>

          {/* Quick Stats / Visual - 5 columns */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#1e293b] bg-[#0b0f22]/90 p-6 backdrop-blur-xl shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00D2FF]" />
                  <span className="text-xs font-semibold tracking-wide text-white uppercase">
                    Model Benchmark
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#94a3b8]">Scikit-Learn 1.9</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#1e293b]/70 bg-[#101733]/70 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                    <CurrencyDollar size={14} className="text-emerald-400" />
                    <span>Mean Abs. Error</span>
                  </div>
                  <div className="text-xl font-bold text-white font-mono">
                    $36,521
                  </div>
                  <div className="text-[10px] text-[#64748b]">Held-out 20% test split</div>
                </div>

                <div className="rounded-xl border border-[#1e293b]/70 bg-[#101733]/70 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                    <TrendUp size={14} className="text-[#00D2FF]" />
                    <span>Accuracy (R²)</span>
                  </div>
                  <div className="text-xl font-bold text-[#00D2FF] font-mono">
                    89.5%
                  </div>
                  <div className="text-[10px] text-[#64748b]">Variance explained</div>
                </div>
              </div>

              <div className="rounded-lg border border-[#0000F2]/25 bg-[#0000F2]/10 p-3 flex items-center justify-between text-xs">
                <span className="text-[#ededf2]">Trained on 5,000 housing transactions</span>
                <span className="font-mono text-[#00D2FF] font-semibold">13 features</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
