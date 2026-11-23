"use client";

import React, { useEffect, useState } from "react";
import { HouseFeaturesInput, PredictionResponse } from "@/types/prediction";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CurrencyDollar,
  ChartLineUp,
  Coins,
  ShieldCheck,
  ShareNetwork,
  Printer,
  Sparkle,
  Check,
  House,
} from "@phosphor-icons/react";
import confetti from "canvas-confetti";

interface ValuationResultCardProps {
  prediction: PredictionResponse | null;
  features: HouseFeaturesInput;
  isLoading: boolean;
}

export function ValuationResultCard({
  prediction,
  features,
  isLoading,
}: ValuationResultCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prediction && !isLoading) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#0000F2", "#00D2FF", "#3B82F6", "#FFFFFF"],
        });
      } catch {
        // canvas-confetti optional fallback
      }
    }
  }, [prediction, isLoading]);

  if (isLoading) {
    return (
      <Card className="border-[#0000F2]/40 bg-[#0b0f22]/90 backdrop-blur-xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full border-2 border-[#00D2FF] border-t-transparent animate-spin" />
          <h3 className="text-base font-semibold text-white">
            Running Random Forest Regression...
          </h3>
        </div>
        <div className="space-y-3">
          <div className="h-12 w-3/4 rounded-lg bg-[#121936] animate-pulse" />
          <div className="h-5 w-1/2 rounded bg-[#101733] animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1e293b]">
          <div className="h-16 rounded-lg bg-[#101733] animate-pulse" />
          <div className="h-16 rounded-lg bg-[#101733] animate-pulse" />
        </div>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="border-dashed border-[#1e293b] bg-[#0b0f22]/50 p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#121936] text-[#3b82f6]">
          <House size={28} />
        </div>
        <div className="space-y-1.5 max-w-sm mx-auto">
          <h3 className="text-base font-semibold text-white">
            Ready for Property Valuation
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Fill in the property specifications or select a quick test scenario, then click Calculate.
          </p>
        </div>
      </Card>
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
  const monthlyInsurance = Math.round(110);
  const totalMonthlyCost = monthlyMortgage + monthlyTax + monthlyInsurance;

  const handleCopySummary = () => {
    const text = `Hermes ML Property Valuation:
Property: ${features.property_type} in ${features.neighborhood}
Living Area: ${features.square_feet.toLocaleString()} sq ft (${pricePerSqFt}/sq ft)
Estimated Market Value: $${price.toLocaleString()}
Estimated Range: $${lowRange.toLocaleString()} - $${highRange.toLocaleString()}
Estimated Monthly Carrying Cost: $${totalMonthlyCost.toLocaleString()}/mo`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="relative overflow-hidden border-[#0000F2]/50 bg-[#0b0f22]/95 backdrop-blur-xl shadow-2xl">
      {/* Top accent glow line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0000F2] via-[#00D2FF] to-[#0000F2]" />

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkle weight="fill" size={16} className="text-[#00D2FF]" />
            <span className="text-xs font-semibold tracking-wider text-[#00D2FF] uppercase">
              Valuation Result
            </span>
          </div>

          {prediction.is_fallback ? (
            <Badge variant="warning" className="text-[10px]">
              Local Benchmark Mode
            </Badge>
          ) : (
            <Badge variant="success" className="text-[10px] gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FastAPI Pipeline
            </Badge>
          )}
        </div>

        <CardTitle className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight pt-2">
          ${price.toLocaleString()}
        </CardTitle>

        <CardDescription className="text-xs text-[#94a3b8]">
          Expected market value based on {features.neighborhood} sales and property dimensions.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#1e293b] bg-[#101733]/70 p-3 space-y-1">
            <span className="text-[11px] text-[#64748b] block font-medium">
              Price / Sq Ft
            </span>
            <span className="text-base font-bold text-white font-mono">
              ${pricePerSqFt}
            </span>
            <span className="text-[10px] text-[#94a3b8] block">Per finished sq ft</span>
          </div>

          <div className="rounded-xl border border-[#1e293b] bg-[#101733]/70 p-3 space-y-1">
            <span className="text-[11px] text-[#64748b] block font-medium">
              Confidence Range
            </span>
            <span className="text-sm font-bold text-[#00D2FF] font-mono block truncate">
              ${lowRange.toLocaleString()} - ${highRange.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#94a3b8] block">+/- $36.5k MAE</span>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#1e293b] bg-[#101733]/70 p-3 space-y-1">
            <span className="text-[11px] text-[#64748b] block font-medium">
              Model Confidence
            </span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              High (0.895 R²)
            </span>
            <span className="text-[10px] text-[#94a3b8] block">Random Forest</span>
          </div>
        </div>

        {/* Financial Carrying Cost Breakdown */}
        <div className="rounded-xl border border-[#1e293b] bg-[#121936]/60 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1e293b]/60 pb-2">
            <div className="flex items-center gap-2">
              <Coins size={16} className="text-[#3b82f6]" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Monthly Carrying Estimate
              </span>
            </div>
            <span className="text-xs font-bold text-white font-mono">
              ${totalMonthlyCost.toLocaleString()}/mo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#64748b] block">Principal & Int.</span>
              <span className="font-mono text-[#ededf2] font-medium">
                ${monthlyMortgage.toLocaleString()}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#64748b] block">Est. Tax</span>
              <span className="font-mono text-[#ededf2] font-medium">
                ${monthlyTax.toLocaleString()}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#64748b] block">Insurance</span>
              <span className="font-mono text-[#ededf2] font-medium">
                ${monthlyInsurance.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-[#64748b] text-center">
            Based on 20% down payment, 30-year fixed at 6.5% APR.
          </p>
        </div>

        {/* Feature Impact Highlights */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] block">
            Key Value Drivers
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-[#1e293b]/50 bg-[#101733]/40 px-3 py-2">
              <span className="text-[#ededf2]">Neighborhood Tier ({features.neighborhood})</span>
              <span className="font-mono text-[#00D2FF] font-medium">
                {features.neighborhood === "Waterfront"
                  ? "+48% Premium"
                  : features.neighborhood === "Downtown"
                  ? "+32% Premium"
                  : features.neighborhood === "Historic District"
                  ? "+22% Premium"
                  : "Baseline"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[#1e293b]/50 bg-[#101733]/40 px-3 py-2">
              <span className="text-[#ededf2]">Condition Grade ({features.condition})</span>
              <span className="font-mono text-emerald-400 font-medium">
                {features.condition === "Excellent"
                  ? "+30% Grade Index"
                  : features.condition === "Very Good"
                  ? "+15% Grade Index"
                  : features.condition === "Good"
                  ? "Standard Index"
                  : "-14% Grade Index"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[#1e293b]/50 bg-[#101733]/40 px-3 py-2">
              <span className="text-[#ededf2]">Living Space Scale</span>
              <span className="font-mono text-white font-medium">
                {features.square_feet.toLocaleString()} sq ft
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopySummary}
            className="flex-1 gap-2"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Copied to Clipboard</span>
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
            className="gap-2"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
