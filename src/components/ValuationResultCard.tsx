"use client";

import React, { useEffect, useState } from "react";
import { HouseFeaturesInput, PredictionResponse } from "@/types/prediction";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpatialModelPreview } from "@/components/SpatialModelPreview";
import {
  CurrencyDollar,
  ChartLineUp,
  Coins,
  ShareNetwork,
  Printer,
  Sparkle,
  Check,
  House,
  Cube,
  Calculator,
  ShieldCheck,
} from "@phosphor-icons/react";
import confetti from "canvas-confetti";

interface ValuationResultCardProps {
  prediction: PredictionResponse | null;
  features: HouseFeaturesInput;
  isLoading: boolean;
}

type ResultTab = "appraisal" | "spatial" | "financial";

export function ValuationResultCard({
  prediction,
  features,
  isLoading,
}: ValuationResultCardProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>("appraisal");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prediction && !isLoading) {
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.65 },
          colors: ["#0000F2", "#00D2FF", "#3B82F6", "#FFFFFF"],
        });
      } catch {
        // confetti fallback
      }
    }
  }, [prediction, isLoading]);

  if (isLoading) {
    return (
      <div className="glass-bevel rounded-2xl p-8 space-y-6 border border-[#0000F2]/40 bg-[#090e24]/95">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-[#00D2FF] border-t-transparent animate-spin" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Traversing 200 Decision Trees...
          </h3>
        </div>
        <div className="space-y-3">
          <div className="h-14 w-3/4 rounded-xl bg-[#101838] animate-pulse" />
          <div className="h-5 w-1/2 rounded-lg bg-[#0d132b] animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#182343]">
          <div className="h-16 rounded-xl bg-[#101838] animate-pulse" />
          <div className="h-16 rounded-xl bg-[#101838] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="rounded-2xl border-dashed border-2 border-[#182343] bg-[#090e24]/40 p-10 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#101838] text-[#00D2FF] shadow-inner">
          <House size={32} weight="duotone" />
        </div>
        <div className="space-y-1.5 max-w-sm mx-auto">
          <h3 className="text-base font-bold text-white tracking-tight">
            Valuation Console Ready
          </h3>
          <p className="text-xs text-[#8a99b5] leading-relaxed">
            Configure property specifications or select a curated archetype scenario to execute the appraisal.
          </p>
        </div>
      </div>
    );
  }

  const price = prediction.predicted_price;
  const sqft = features.square_feet || 1;
  const pricePerSqFt = Math.round(price / sqft);

  // Model MAE is ~$36,521 on holdout test set
  const lowRange = Math.max(50000, Math.round((price - 36521) / 500) * 500);
  const highRange = Math.round((price + 36521) / 500) * 500;

  // Monthly mortgage calculation: 20% down, 30-year fixed at 6.5%
  const principal = price * 0.8;
  const monthlyRate = 0.065 / 12;
  const totalMonths = 360;
  const monthlyMortgage = Math.round(
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const monthlyTax = Math.round((price * 0.011) / 12);
  const monthlyInsurance = 110;
  const totalMonthlyCost = monthlyMortgage + monthlyTax + monthlyInsurance;

  const handleCopySummary = () => {
    const text = `Hermes ML Property Appraisal:
Property: ${features.property_type} in ${features.neighborhood}
Living Area: ${features.square_feet.toLocaleString()} sq ft ($${pricePerSqFt}/sq ft)
Estimated Market Value: $${price.toLocaleString()}
Confidence Band (+/- MAE): $${lowRange.toLocaleString()} - $${highRange.toLocaleString()}
Monthly Carrying Cost: $${totalMonthlyCost.toLocaleString()}/mo`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <TiltCard
      maxTilt={6}
      glowColor="rgba(0, 0, 242, 0.35)"
      className="glass-bevel overflow-hidden"
    >
      {/* Top Holographic Specular Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0000F2] via-[#00D2FF] to-[#0000F2]" />

      <div className="p-6 space-y-6">
        {/* Header & Mode Badging */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#00D2FF]/20 text-[#00D2FF]">
              <Sparkle weight="fill" size={12} />
            </div>
            <span className="text-[11px] font-bold tracking-widest text-[#00D2FF] uppercase font-mono">
              Official Valuation Certificate
            </span>
          </div>

          {prediction.is_fallback ? (
            <Badge variant="warning" className="text-[10px] font-mono">
              Benchmark Mode
            </Badge>
          ) : (
            <Badge variant="success" className="text-[10px] gap-1.5 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FastAPI Pipeline
            </Badge>
          )}
        </div>

        {/* Dynamic Display Price Ticker */}
        <div style={{ transform: "translateZ(30px)" }} className="space-y-1">
          <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
            ${price.toLocaleString()}
          </div>
          <p className="text-xs text-[#8a99b5] leading-relaxed">
            Market appraisal for {features.property_type} within the {features.neighborhood} micro-district.
          </p>
        </div>

        {/* 3-Tab Navigator */}
        <div className="flex items-center gap-1 rounded-xl border border-[#182343] bg-[#060a1f] p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("appraisal")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-all cursor-pointer ${
              activeTab === "appraisal"
                ? "bg-[#0000F2] text-white shadow-md shadow-[#0000F2]/30"
                : "text-[#8a99b5] hover:text-white"
            }`}
          >
            <ShieldCheck size={14} />
            <span>Appraisal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("spatial")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-all cursor-pointer ${
              activeTab === "spatial"
                ? "bg-[#0000F2] text-white shadow-md shadow-[#0000F2]/30"
                : "text-[#8a99b5] hover:text-white"
            }`}
          >
            <Cube size={14} />
            <span>3D Model</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("financial")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-all cursor-pointer ${
              activeTab === "financial"
                ? "bg-[#0000F2] text-white shadow-md shadow-[#0000F2]/30"
                : "text-[#8a99b5] hover:text-white"
            }`}
          >
            <Calculator size={14} />
            <span>Financing</span>
          </button>
        </div>

        {/* Tab 1: Appraisal Metrics */}
        {activeTab === "appraisal" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#182343] bg-[#060a1f]/80 p-3.5 space-y-1">
                <span className="text-[10px] text-[#64748b] block font-mono font-medium">
                  PRICE PER SQ FT
                </span>
                <span className="text-lg font-bold text-white font-mono">
                  ${pricePerSqFt}
                </span>
                <span className="text-[10px] text-[#8a99b5] block">Finished area</span>
              </div>

              <div className="rounded-xl border border-[#182343] bg-[#060a1f]/80 p-3.5 space-y-1">
                <span className="text-[10px] text-[#64748b] block font-mono font-medium">
                  CONFIDENCE BAND
                </span>
                <span className="text-xs font-bold text-[#00D2FF] font-mono block truncate">
                  ${lowRange.toLocaleString()} - ${highRange.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#8a99b5] block">+/- $36.5k MAE</span>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#182343] bg-[#060a1f]/80 p-3.5 space-y-1">
                <span className="text-[10px] text-[#64748b] block font-mono font-medium">
                  ENSEMBLE SCORE
                </span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  89.5%
                </span>
                <span className="text-[10px] text-[#8a99b5] block">Holdout accuracy</span>
              </div>
            </div>

            {/* Key Value Drivers List */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8a99b5] block">
                Primary Model Multipliers
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between rounded-lg border border-[#182343]/70 bg-[#0d132b]/50 px-3 py-2">
                  <span className="text-[#f1f2f8]">Location Multiplier ({features.neighborhood})</span>
                  <span className="font-mono text-[#00D2FF] font-bold">
                    {features.neighborhood === "Waterfront"
                      ? "+48% Bayfront Base"
                      : features.neighborhood === "Downtown"
                      ? "+32% Core Base"
                      : features.neighborhood === "Historic District"
                      ? "+22% Heritage Base"
                      : "Standard Baseline"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-[#182343]/70 bg-[#0d132b]/50 px-3 py-2">
                  <span className="text-[#f1f2f8]">Finish Quality ({features.condition})</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {features.condition === "Excellent"
                      ? "+30% Grade Index"
                      : features.condition === "Very Good"
                      ? "+15% Grade Index"
                      : features.condition === "Good"
                      ? "Neutral Factor"
                      : "-14% Grade Index"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-[#182343]/70 bg-[#0d132b]/50 px-3 py-2">
                  <span className="text-[#f1f2f8]">Age Depreciation</span>
                  <span className="font-mono text-[#f1f2f8] font-bold">
                    {features.house_age === 0 ? "New Construction" : `${features.house_age} Years`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 3D Spatial Model Preview */}
        {activeTab === "spatial" && (
          <div className="space-y-4">
            <SpatialModelPreview features={features} />
          </div>
        )}

        {/* Tab 3: Financial Carrying Matrix */}
        {activeTab === "financial" && (
          <div className="rounded-xl border border-[#182343] bg-[#060a1f]/90 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#182343] pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Carrying Capital Schedule
              </span>
              <span className="text-sm font-bold text-[#00D2FF] font-mono">
                ${totalMonthlyCost.toLocaleString()}/mo
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="space-y-0.5 rounded-lg bg-[#0d132b]/80 p-2">
                <span className="text-[10px] text-[#64748b] block font-mono">Principal & Int.</span>
                <span className="font-mono text-white font-bold">
                  ${monthlyMortgage.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5 rounded-lg bg-[#0d132b]/80 p-2">
                <span className="text-[10px] text-[#64748b] block font-mono">Property Tax</span>
                <span className="font-mono text-white font-bold">
                  ${monthlyTax.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5 rounded-lg bg-[#0d132b]/80 p-2">
                <span className="text-[10px] text-[#64748b] block font-mono">Insurance</span>
                <span className="font-mono text-white font-bold">
                  ${monthlyInsurance.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#8a99b5] text-center leading-relaxed">
              Standard 80% LTV financing modeled at 6.50% 30-year fixed term. Real tax rates subject to municipal millage.
            </p>
          </div>
        )}

        {/* Export / Share Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#182343]">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopySummary}
            className="flex-1 gap-2 font-medium"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Copied Certificate</span>
              </>
            ) : (
              <>
                <ShareNetwork size={14} />
                <span>Copy Summary</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2 font-medium"
          >
            <Printer size={14} />
            <span>Print Appraisal</span>
          </Button>
        </div>
      </div>
    </TiltCard>
  );
}
