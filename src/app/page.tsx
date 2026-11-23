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
    setActivePresetId(""); // clear active scenario highlight on manual parameter edits
  };

  const handleFormSubmit = () => {
    executeValuation(features);
  };

  return (
    <div className="min-h-screen bg-[#050711] text-[#f1f2f8] selection:bg-[#0000F2] selection:text-white bg-grid-cad flex flex-col relative overflow-x-hidden">
      {/* Global Ambient Glow Cones */}
      <div className="pointer-events-none fixed top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#0000F2]/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#00D2FF]/6 blur-[130px]" />

      <Navbar
        onSelectPreset={(id) => {
          const found = PRESET_PROPERTIES.find((p) => p.id === id);
          if (found) handleSelectPreset(found);
        }}
      />

      <main className="flex-1 relative z-10">
        <HeroSection
          onScrollToForm={handleScrollToForm}
          onSelectDefaultPreset={() => handleSelectPreset(PRESET_PROPERTIES[0])}
        />

        <div ref={formRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* 3D Curated Scenarios Row */}
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

            {/* Right Column: Sticky Holographic Valuation Result & 3D Model (5 cols) */}
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
