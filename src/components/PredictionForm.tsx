"use client";

import React, { useState } from "react";
import {
  HouseFeaturesInput,
  PropertyType,
  Neighborhood,
  PropertyCondition,
  HeatingType,
  YesNo,
} from "@/types/prediction";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  HouseLine,
  Bed,
  MapPin,
  CheckCircle,
  Lightning,
  Calendar,
  Sparkle,
  SlidersHorizontal,
  Flame,
  CarSimple,
  PottedPlant,
  Wrench,
} from "@phosphor-icons/react";

interface PredictionFormProps {
  features: HouseFeaturesInput;
  onChange: (features: HouseFeaturesInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PROPERTY_TYPES: PropertyType[] = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Villa",
  "Duplex",
  "Apartment",
];

const NEIGHBORHOODS: Neighborhood[] = [
  "Waterfront",
  "Downtown",
  "Suburb",
  "Historic District",
  "Uptown",
  "Westside",
  "East End",
  "North Hills",
];

const CONDITIONS: { label: PropertyCondition; desc: string }[] = [
  { label: "Poor", desc: "Significant deferred maintenance" },
  { label: "Fair", desc: "Functional with cosmetic wear" },
  { label: "Good", desc: "Sound envelope & updated systems" },
  { label: "Very Good", desc: "High-spec modern finishes" },
  { label: "Excellent", desc: "Pristine luxury execution" },
];

const HEATING_TYPES: HeatingType[] = [
  "Gas",
  "Heat Pump",
  "Electric",
  "None",
  "Geothermal",
  "Solar",
];

export function PredictionForm({
  features,
  onChange,
  onSubmit,
  isLoading,
}: PredictionFormProps) {
  const [useYearBuilt, setUseYearBuilt] = useState(false);
  const currentYear = 2026;

  const updateField = <K extends keyof HouseFeaturesInput>(
    field: K,
    value: HouseFeaturesInput[K]
  ) => {
    onChange({
      ...features,
      [field]: value,
    });
  };

  const handleYearBuiltChange = (year: number) => {
    const calculatedAge = Math.max(0, currentYear - year);
    updateField("house_age", calculatedAge);
  };

  const currentYearBuilt = currentYear - features.house_age;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      {/* Group 1: Architectural Typology & Footprint */}
      <div className="rounded-2xl border border-[#182343] bg-[#090e24]/90 p-6 space-y-5 shadow-xl glass-bevel">
        <div className="flex items-center justify-between pb-3 border-b border-[#182343]/80">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0000F2]/20 text-[#00D2FF]">
              <HouseLine size={15} weight="duotone" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Typology & Spatial Footprint
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#8a99b5]">Section 01</span>
        </div>

        {/* Property Type Tactile Pill Grid */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-[#f1f2f8] tracking-wide">
            Structural Typology
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PROPERTY_TYPES.map((type) => {
              const active = features.property_type === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("property_type", type)}
                  className={`rounded-xl border py-2.5 px-3 text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                    active
                      ? "border-[#0000F2] bg-[#0000F2]/25 text-white ring-1 ring-[#0000F2] shadow-sm shadow-[#0000F2]/30"
                      : "border-[#182343] bg-[#0d132b]/80 text-[#8a99b5] hover:text-white hover:border-[#1e2d57]"
                  }`}
                >
                  <span>{type}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Neighborhood Selection */}
        <Select
          label="Neighborhood Location"
          value={features.neighborhood}
          onChange={(e) => updateField("neighborhood", e.target.value)}
          options={NEIGHBORHOODS}
          helperText="Location tier impacts valuation base appraisal multiplier"
        />

        {/* Living Area with Dual Slider + Number Input */}
        <div className="space-y-2 pt-2 border-t border-[#182343]/60">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#f1f2f8] flex items-center gap-1.5">
              <SlidersHorizontal size={13} className="text-[#00D2FF]" />
              <span>Conditioned Living Area</span>
            </label>
            <span className="font-mono text-xs font-bold text-[#00D2FF]">
              {features.square_feet.toLocaleString()} sq ft
            </span>
          </div>

          <input
            id="living-area-range"
            aria-label="Conditioned Living Area Slider"
            type="range"
            min={400}
            max={8000}
            step={50}
            value={features.square_feet}
            onChange={(e) => updateField("square_feet", Number(e.target.value))}
            className="w-full accent-[#0000F2] cursor-pointer h-1.5 bg-[#101838] rounded-lg"
          />

          <div className="grid grid-cols-2 gap-4 pt-1">
            <Input
              label="Precise Living Area"
              type="number"
              min={300}
              max={20000}
              step={10}
              unit="sq ft"
              value={features.square_feet}
              onChange={(e) => updateField("square_feet", Number(e.target.value))}
            />
            <Input
              label="Total Lot Parcel"
              type="number"
              min={500}
              max={50000}
              step={50}
              unit="sq ft"
              value={features.lot_square_feet}
              onChange={(e) => updateField("lot_square_feet", Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Group 2: Interior Layout & Capacity */}
      <div className="rounded-2xl border border-[#182343] bg-[#090e24]/90 p-6 space-y-5 shadow-xl glass-bevel">
        <div className="flex items-center justify-between pb-3 border-b border-[#182343]/80">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3b82f6]/20 text-[#3b82f6]">
              <Bed size={15} weight="duotone" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Interior Specs & Mechanics
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#8a99b5]">Section 02</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input
            label="Bedrooms"
            type="number"
            min={1}
            max={12}
            step={1}
            value={features.bedrooms}
            onChange={(e) => updateField("bedrooms", Number(e.target.value))}
          />

          <Input
            label="Bathrooms"
            type="number"
            min={1}
            max={10}
            step={0.5}
            value={features.bathrooms}
            onChange={(e) => updateField("bathrooms", Number(e.target.value))}
          />

          <Select
            label="Heating System"
            value={features.heating_type}
            onChange={(e) => updateField("heating_type", e.target.value)}
            options={HEATING_TYPES}
          />

          <Input
            label="Parking Spaces"
            type="number"
            min={0}
            max={8}
            step={1}
            value={features.parking_spaces}
            onChange={(e) => updateField("parking_spaces", Number(e.target.value))}
          />
        </div>
      </div>

      {/* Group 3: Condition Index & Enhancements */}
      <div className="rounded-2xl border border-[#182343] bg-[#090e24]/90 p-6 space-y-5 shadow-xl glass-bevel">
        <div className="flex items-center justify-between pb-3 border-b border-[#182343]/80">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00D2FF]/20 text-[#00D2FF]">
              <CheckCircle size={15} weight="duotone" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Condition & Architectural Enhancements
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#8a99b5]">Section 03</span>
        </div>

        {/* 5-Tier Condition Segmented Rail */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-[#f1f2f8] tracking-wide">
            Finish Quality & Envelope Condition
          </label>
          <div className="grid grid-cols-5 gap-1.5 rounded-xl border border-[#182343] bg-[#060a1f] p-1.5">
            {CONDITIONS.map((cond) => {
              const isSelected = features.condition === cond.label;
              return (
                <button
                  key={cond.label}
                  type="button"
                  onClick={() => updateField("condition", cond.label)}
                  className={`rounded-lg py-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0000F2] text-white font-bold shadow-md shadow-[#0000F2]/40"
                      : "text-[#8a99b5] hover:text-white hover:bg-[#101838]"
                  }`}
                >
                  <span className="block text-xs">{cond.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-[#8a99b5]">
            Selected: {CONDITIONS.find((c) => c.label === features.condition)?.desc}
          </p>
        </div>

        {/* Garden & Renovation Switches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#182343]/60">
          <div className="flex items-center justify-between rounded-xl border border-[#182343] bg-[#0d132b]/80 p-3.5">
            <div className="flex items-center gap-2.5">
              <PottedPlant size={18} className="text-emerald-400" />
              <div>
                <span className="text-xs font-semibold text-white block">Private Garden</span>
                <span className="text-[10px] text-[#8a99b5]">Landscaped outdoor parcel</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateField("has_garden", features.has_garden === "Yes" ? "No" : "Yes")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                features.has_garden === "Yes"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-[#101838] text-[#8a99b5] border border-[#182343]"
              }`}
            >
              {features.has_garden}
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[#182343] bg-[#0d132b]/80 p-3.5">
            <div className="flex items-center gap-2.5">
              <Wrench size={18} className="text-[#00D2FF]" />
              <div>
                <span className="text-xs font-semibold text-white block">Recently Renovated</span>
                <span className="text-[10px] text-[#8a99b5]">Upgraded interior finishes</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateField("renovated", features.renovated === "Yes" ? "No" : "Yes")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                features.renovated === "Yes"
                  ? "bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40"
                  : "bg-[#101838] text-[#8a99b5] border border-[#182343]"
              }`}
            >
              {features.renovated}
            </button>
          </div>
        </div>
      </div>

      {/* Group 4: Geographic Transit & Temporal Age */}
      <div className="rounded-2xl border border-[#182343] bg-[#090e24]/90 p-6 space-y-5 shadow-xl glass-bevel">
        <div className="flex items-center justify-between pb-3 border-b border-[#182343]/80">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3b82f6]/20 text-[#3b82f6]">
              <MapPin size={15} weight="duotone" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Geographic Proximity & Era
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setUseYearBuilt(!useYearBuilt)}
            className="flex items-center gap-1.5 text-xs text-[#00D2FF] hover:underline cursor-pointer"
          >
            <Calendar size={13} />
            <span>Switch to {useYearBuilt ? "House Age" : "Year Built"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Distance to City Center"
            type="number"
            min={0.1}
            max={50}
            step={0.1}
            unit="km"
            value={features.distance_to_city_center_km}
            onChange={(e) => updateField("distance_to_city_center_km", Number(e.target.value))}
            helperText="Direct transit radius to central commercial core"
          />

          {useYearBuilt ? (
            <Input
              label="Year of Construction"
              type="number"
              min={1850}
              max={currentYear}
              step={1}
              value={currentYearBuilt}
              onChange={(e) => handleYearBuiltChange(Number(e.target.value))}
              helperText={`Equivalent to ${features.house_age} years of age`}
            />
          ) : (
            <Input
              label="Structure Age"
              type="number"
              min={0}
              max={120}
              step={1}
              unit="yrs"
              value={features.house_age}
              onChange={(e) => updateField("house_age", Number(e.target.value))}
              helperText={`Constructed circa ${currentYearBuilt}`}
            />
          )}
        </div>
      </div>

      {/* Primary Trigger CTA */}
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full text-base font-bold tracking-wide shadow-2xl shadow-[#0000F2]/40 h-13"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Lightning size={18} className="animate-spin text-[#00D2FF]" />
            <span>Calibrating Multi-Tree Valuation...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2.5">
            <Sparkle size={18} weight="fill" className="text-[#00D2FF]" />
            <span>Compute Machine Learning Appraisal</span>
          </span>
        )}
      </Button>
    </form>
  );
}
