"use client";

import React, { useState } from "react";
import { HouseFeaturesInput, PropertyType, Neighborhood, PropertyCondition, HeatingType, YesNo } from "@/types/prediction";
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

const CONDITIONS: PropertyCondition[] = [
  "Poor",
  "Fair",
  "Good",
  "Very Good",
  "Excellent",
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
      {/* Group 1: Architectural & Spatial */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0b0f22]/90 p-5 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 pb-2 border-b border-[#1e293b]/60">
          <HouseLine size={18} className="text-[#0000F2]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Property Typology & Size
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Property Type"
            value={features.property_type}
            onChange={(e) => updateField("property_type", e.target.value)}
            options={PROPERTY_TYPES}
          />

          <Select
            label="Neighborhood"
            value={features.neighborhood}
            onChange={(e) => updateField("neighborhood", e.target.value)}
            options={NEIGHBORHOODS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Living Area"
            type="number"
            min={300}
            max={20000}
            step={10}
            unit="sq ft"
            value={features.square_feet}
            onChange={(e) => updateField("square_feet", Number(e.target.value))}
            helperText="Finished interior conditioned space"
          />

          <Input
            label="Lot Size"
            type="number"
            min={500}
            max={50000}
            step={50}
            unit="sq ft"
            value={features.lot_square_feet}
            onChange={(e) => updateField("lot_square_feet", Number(e.target.value))}
            helperText="Total land parcel footprint"
          />
        </div>
      </div>

      {/* Group 2: Interior Layout & Capacity */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0b0f22]/90 p-5 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 pb-2 border-b border-[#1e293b]/60">
          <Bed size={18} className="text-[#3b82f6]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Interior Layout & Amenities
          </h4>
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

      {/* Group 3: Condition & Upgrades */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0b0f22]/90 p-5 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 pb-2 border-b border-[#1e293b]/60">
          <CheckCircle size={18} className="text-[#00D2FF]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
            Condition & Upgrades
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Overall Condition"
            value={features.condition}
            onChange={(e) => updateField("condition", e.target.value as PropertyCondition)}
            options={CONDITIONS}
          />

          <Select
            label="Private Garden / Yard"
            value={features.has_garden}
            onChange={(e) => updateField("has_garden", e.target.value as YesNo)}
            options={["Yes", "No"]}
          />

          <Select
            label="Recently Renovated"
            value={features.renovated}
            onChange={(e) => updateField("renovated", e.target.value as YesNo)}
            options={["Yes", "No"]}
          />
        </div>
      </div>

      {/* Group 4: Location & Age */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0b0f22]/90 p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]/60">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#3b82f6]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Location Proximity & Age
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setUseYearBuilt(!useYearBuilt)}
            className="flex items-center gap-1.5 text-xs text-[#00D2FF] hover:underline"
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
            helperText="Straight line distance to central metropolitan district"
          />

          {useYearBuilt ? (
            <Input
              label="Year Built"
              type="number"
              min={1850}
              max={currentYear}
              step={1}
              value={currentYearBuilt}
              onChange={(e) => handleYearBuiltChange(Number(e.target.value))}
              helperText={`Equivalent to ${features.house_age} years old`}
            />
          ) : (
            <Input
              label="House Age"
              type="number"
              min={0}
              max={120}
              step={1}
              unit="yrs"
              value={features.house_age}
              onChange={(e) => updateField("house_age", Number(e.target.value))}
              helperText={`Built circa ${currentYearBuilt}`}
            />
          )}
        </div>
      </div>

      {/* Primary Trigger CTA */}
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full text-base font-bold tracking-wide shadow-xl shadow-[#0000F2]/30"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Lightning size={18} className="animate-spin" />
            <span>Calculating ML Valuation...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkle size={18} weight="fill" className="text-[#00D2FF]" />
            <span>Run Machine Learning Valuation</span>
          </span>
        )}
      </Button>
    </form>
  );
}
