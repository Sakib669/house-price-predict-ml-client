"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ArrowDown,
  Buildings,
  CurrencyDollar,
  TrendUp,
  Cpu,
  Stack,
  Sparkle,
} from "@phosphor-icons/react";

interface HeroSectionProps {
  onScrollToForm: () => void;
  onSelectDefaultPreset: () => void;
}

export function HeroSection({ onScrollToForm, onSelectDefaultPreset }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 border-b border-[#182343]/70">
      {/* 3D Atmospheric Lighting Cones */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[320px] w-[600px] rounded-full bg-[#0000F2]/14 blur-[130px]" />
        <div className="h-[220px] w-[380px] rounded-full bg-[#00D2FF]/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0000F2]/40 bg-gradient-to-r from-[#0000F2]/15 to-[#00D2FF]/10 px-3.5 py-1 text-xs font-semibold text-[#00D2FF]">
              <Sparkle weight="fill" size={13} className="text-[#00D2FF]" />
              <span>Architectural Valuation Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.06]">
              Haute real estate valuation, calibrated by machine learning.
            </h1>

            <p className="text-base text-[#8a99b5] max-w-[52ch] leading-relaxed">
              Synthesize 13 architectural and location parameters into fair market appraisals with our holdout-tested Random Forest regressor.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                size="lg"
                onClick={onScrollToForm}
                className="gap-2.5 font-bold shadow-xl shadow-[#0000F2]/35"
              >
                <span>Launch Valuation Deck</span>
                <ArrowDown size={16} />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onSelectDefaultPreset}
                className="gap-2 font-medium"
              >
                <Buildings size={16} className="text-[#00D2FF]" />
                <span>Load Waterfront Model</span>
              </Button>
            </div>
          </div>

          {/* 3D Monolith Benchmark Card - 5 columns */}
          <div className="lg:col-span-5">
            <TiltCard
              maxTilt={12}
              glowColor="rgba(0, 210, 255, 0.3)"
              className="glass-bevel p-6 space-y-5"
            >
              <div
                style={{ transform: "translateZ(20px)" }}
                className="flex items-center justify-between pb-3 border-b border-[#182343]"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00D2FF] animate-pulse" />
                  <span className="text-xs font-bold tracking-wider text-white uppercase font-mono">
                    Model Blueprint v1.0
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00D2FF]">
                  <Cpu size={14} />
                  <span>200 Trees</span>
                </div>
              </div>

              {/* Holographic Metric Counters */}
              <div
                style={{ transform: "translateZ(30px)" }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="rounded-xl border border-[#182343] bg-[#060a1f]/80 p-4 space-y-1 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-xs text-[#8a99b5]">
                    <CurrencyDollar size={15} className="text-emerald-400" />
                    <span>Holdout MAE</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
                    $36,521
                  </div>
                  <div className="text-[10px] text-[#64748b] font-mono">Held-out 1,000 houses</div>
                </div>

                <div className="rounded-xl border border-[#182343] bg-[#060a1f]/80 p-4 space-y-1 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-xs text-[#8a99b5]">
                    <TrendUp size={15} className="text-[#00D2FF]" />
                    <span>Explained R²</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#00D2FF] font-mono tracking-tight">
                    89.5%
                  </div>
                  <div className="text-[10px] text-[#64748b] font-mono">Precision benchmark</div>
                </div>
              </div>

              {/* Sub-strip with architectural coordinate specs */}
              <div
                style={{ transform: "translateZ(15px)" }}
                className="rounded-lg border border-[#0000F2]/30 bg-[#0000F2]/10 p-3 flex items-center justify-between text-xs font-mono"
              >
                <span className="text-[#f1f2f8] flex items-center gap-1.5">
                  <Stack size={14} className="text-[#00D2FF]" />
                  <span>5,000 Verified Transactions</span>
                </span>
                <span className="text-[#00D2FF] font-bold">13 Variables</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
