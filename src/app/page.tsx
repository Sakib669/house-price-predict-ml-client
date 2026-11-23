"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PresetSelector } from "@/components/PresetSelector";
import { PredictionForm } from "@/components/PredictionForm";
import { ValuationResultCard } from "@/components/ValuationResultCard";
import { MarketInsights } from "@/components/MarketInsights";
import { Footer } from "@/components/Footer";
import { PRESET_PROPERTIES } from "@/lib/presets";
import { HouseFeaturesInput, PredictionResponse, PresetProperty } from "@/types/prediction";
import { predictHousePrice } from "@/lib/api";

export default function HomePage() {
  const [features, setFeatures] = useState<HouseFeaturesInput>(PRESET_PROPERTIES[0].data);
  const [activePresetId, setActivePresetId] = useState<string>(PRESET_PROPERTIES[0].id);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const executeValuation = useCallback(async (data: HouseFeaturesInput) => {
    setIsLoading(true);
    try {
      const result = await predictHousePrice(data);
      setPrediction(result);
    } catch (error) {
      console.error("Valuation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial calculation on mount
  useEffect(() => {
    executeValuation(PRESET_PROPERTIES[0].data);
  }, [executeValuation]);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectPreset = (preset: PresetProperty) => {
    setFeatures(preset.data);
    setActivePresetId(preset.id);
    executeValuation(preset.data);
    handleScrollToForm();
  };

  const handleFormChange = (newFeatures: HouseFeaturesInput) => {
    setFeatures(newFeatures);
    setActivePresetId(""); // cleared manual edit
  };

  const handleFormSubmit = () => {
    executeValuation(features);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-[#ededf2] selection:bg-[#0000F2] selection:text-white bg-grid-subtle flex flex-col">
      <Navbar onSelectPreset={(id) => {
        const found = PRESET_PROPERTIES.find((p) => p.id === id);
        if (found) handleSelectPreset(found);
      }} />

      <main className="flex-1">
        <HeroSection
          onScrollToForm={handleScrollToForm}
          onSelectDefaultPreset={() => handleSelectPreset(PRESET_PROPERTIES[0])}
        />

        <div ref={formRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Quick presets row */}
          <PresetSelector
            activePresetId={activePresetId}
            onSelect={handleSelectPreset}
          />

          {/* Interactive Calculator Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Controls (7 cols) */}
            <div className="lg:col-span-7">
              <PredictionForm
                features={features}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Right Column: Sticky Results & Financial Analysis (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <ValuationResultCard
                prediction={prediction}
                features={features}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <MarketInsights />
      </main>

      <Footer />
    </div>
  );
}
