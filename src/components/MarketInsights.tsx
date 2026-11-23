"use client";

import React from "react";
import { ChartBar, TreeStructure, Compass, Lightning, Scales } from "@phosphor-icons/react";

const FEATURE_IMPORTANCES = [
  { feature: "Square Footage (Living Area)", importance: 42, icon: ChartBar, desc: "Primary valuation driver across all neighborhoods" },
  { feature: "Neighborhood Location", importance: 24, icon: Compass, desc: "Waterfront and Downtown command substantial premiums" },
  { feature: "House Age & Year Built", importance: 14, icon: TreeStructure, desc: "Modern builds and updated envelopes preserve capital" },
  { feature: "Property Condition Grade", importance: 11, icon: Scales, desc: "Maintained finishes yield strong appraisal multipliers" },
  { feature: "Bathrooms & Bedrooms", importance: 9, icon: Lightning, desc: "Functional capacity for occupant density" },
];

export function MarketInsights() {
  return (
    <section className="py-12 border-t border-[#1e293b]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0000F2]/40 bg-[#0000F2]/10 px-3 py-1 text-xs font-semibold text-[#00D2FF]">
            <ChartBar size={14} />
            <span>Explainable Machine Learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            How our Random Forest Regressor calculates value
          </h2>
          <p className="text-sm text-[#94a3b8] max-w-2xl leading-relaxed">
            Trained on 5,000 real property transactions. Below is the empirical feature importance distribution across 200 decision trees.
          </p>
        </div>

        {/* Asymmetric visual bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main feature importance bar breakdown - 7 cols */}
          <div className="md:col-span-7 rounded-2xl border border-[#1e293b] bg-gradient-to-br from-[#0b0f22] via-[#0e142d] to-[#121936] p-6 space-y-5 shadow-xl">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Feature Weight Distribution
            </h3>

            <div className="space-y-4">
              {FEATURE_IMPORTANCES.map((item) => (
                <div key={item.feature} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white flex items-center gap-2">
                      <item.icon size={15} className="text-[#00D2FF]" />
                      {item.feature}
                    </span>
                    <span className="font-mono font-bold text-[#00D2FF]">
                      {item.importance}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#101733] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0000F2] to-[#00D2FF] transition-all duration-500"
                      style={{ width: `${item.importance}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#64748b]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Side insights panel - 5 cols with visual background diversity */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-[#0000F2]/30 bg-gradient-to-br from-[#0000F2]/10 via-[#0b0f22] to-[#060814] p-6 space-y-6 shadow-xl relative overflow-hidden">
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-[#00D2FF]/10 blur-3xl" />

            <div className="space-y-3">
              <span className="inline-block rounded-md bg-[#0000F2]/20 px-2 py-0.5 text-[10px] font-semibold text-[#00D2FF] border border-[#0000F2]/40">
                Pipeline Integrity
              </span>
              <h3 className="text-lg font-bold text-white leading-snug">
                Ensemble robustness across unseen property configurations
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                The scikit-learn pipeline couples median and most-frequent imputation with one-hot encoding for nominal categories, safeguarding inference against unseen features and missing attributes.
              </p>
            </div>

            <div className="rounded-xl border border-[#1e293b] bg-[#101733]/80 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Test Split Holdout</span>
                <span className="font-mono text-white font-bold">1,000 houses (20%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Mean Absolute Error</span>
                <span className="font-mono text-emerald-400 font-bold">$36,521</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">R² Explained Variance</span>
                <span className="font-mono text-[#00D2FF] font-bold">0.895</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
