"use client";

import React from "react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ChartBar, TreeStructure, Compass, Lightning, Scales, ShieldCheck, Sparkle } from "@phosphor-icons/react";

const FEATURE_IMPORTANCES = [
  { feature: "Living Space Area (Conditioned)", importance: 42, icon: ChartBar, desc: "Primary base appraisal weight across all housing tiers" },
  { feature: "Geographic Neighborhood Tier", importance: 24, icon: Compass, desc: "Waterfront and Downtown command substantial appraisal premiums" },
  { feature: "Structure Age & Year Built", importance: 14, icon: TreeStructure, desc: "Contemporary envelopes and updated mechanics preserve capital" },
  { feature: "Finish Quality & Envelope Grade", importance: 11, icon: Scales, desc: "Appraisal multipliers scale aggressively with condition rating" },
  { feature: "Bed & Bath Capacity Ratio", importance: 9, icon: Lightning, desc: "Occupancy volume and luxury amenity density" },
];

export function MarketInsights() {
  return (
    <section className="py-14 border-t border-[#182343]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0000F2]/40 bg-[#0000F2]/10 px-3.5 py-1 text-xs font-semibold text-[#00D2FF]">
            <Sparkle weight="fill" size={13} />
            <span>Explainable Algorithmic Decomposition</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            How the 200-tree regression ensemble weights property value
          </h2>
          <p className="text-sm text-[#8a99b5] max-w-2xl leading-relaxed">
            Derived directly from 5,000 real property transactions. Below is the empirical Gini impurity importance allocation.
          </p>
        </div>

        {/* Asymmetric 3D Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Main feature weight bar breakdown - 7 cols */}
          <div className="md:col-span-7">
            <TiltCard
              maxTilt={6}
              glowColor="rgba(0, 210, 255, 0.22)"
              className="glass-bevel p-7 space-y-5 h-full"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#182343]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Ensemble Feature Attribution
                </h3>
                <span className="text-[11px] font-mono text-[#00D2FF]">100% Total Normalized</span>
              </div>

              <div className="space-y-4">
                {FEATURE_IMPORTANCES.map((item) => (
                  <div key={item.feature} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <item.icon size={15} className="text-[#00D2FF]" />
                        {item.feature}
                      </span>
                      <span className="font-mono font-extrabold text-[#00D2FF]">
                        {item.importance}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#060a1f] p-0.5 border border-[#182343]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0000F2] via-[#3B82F6] to-[#00D2FF] transition-all duration-700 shadow-sm shadow-[#0000F2]"
                        style={{ width: `${item.importance}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#8a99b5]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Side insights panel - 5 cols with visual background diversity */}
          <div className="md:col-span-5">
            <TiltCard
              maxTilt={8}
              glowColor="rgba(0, 0, 242, 0.4)"
              className="glass-bevel p-7 space-y-6 h-full flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3.5">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-[#0000F2]/25 px-2.5 py-1 text-[10px] font-bold text-[#00D2FF] border border-[#0000F2]/40 font-mono">
                  <ShieldCheck size={13} weight="fill" />
                  <span>Pipeline Architecture</span>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug tracking-tight">
                  Deterministic preprocessing with missing value resilience
                </h3>

                <p className="text-xs text-[#8a99b5] leading-relaxed">
                  The model executes multi-step median numerical imputation alongside frequency-based categorical encoding. Even if rare or missing features are submitted, the pipeline guarantees finite appraisal estimates.
                </p>
              </div>

              <div className="rounded-xl border border-[#182343] bg-[#060a1f]/90 p-4 space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8a99b5]">Holdout Validation</span>
                  <span className="text-white font-bold">1,000 Homes (20%)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8a99b5]">Mean Absolute Error</span>
                  <span className="text-emerald-400 font-bold">$36,521 USD</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8a99b5]">Explained Variance</span>
                  <span className="text-[#00D2FF] font-bold">0.895 R²</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
