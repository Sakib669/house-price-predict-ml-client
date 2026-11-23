"use client";

import React from "react";
import { PRESET_PROPERTIES } from "@/lib/presets";
import { PresetProperty } from "@/types/prediction";
import { Badge } from "@/components/ui/badge";
import { House, Compass, Sparkle } from "@phosphor-icons/react";

interface PresetSelectorProps {
  activePresetId?: string;
  onSelect: (preset: PresetProperty) => void;
}

export function PresetSelector({ activePresetId, onSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkle size={15} className="text-[#00D2FF]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
            Quick Test Scenarios
          </h4>
        </div>
        <span className="text-[11px] text-[#64748b]">Click any scenario to populate</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESET_PROPERTIES.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset)}
              className={`group flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#0000F2] bg-[#0000F2]/15 shadow-md shadow-[#0000F2]/20 ring-1 ring-[#0000F2]"
                  : "border-[#1e293b] bg-[#0b0f22]/70 hover:border-[#0000F2]/50 hover:bg-[#101733]"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                    {preset.title}
                  </span>
                  <Badge variant={isSelected ? "cyan" : "outline"} className="text-[10px] py-0 px-1.5">
                    {preset.badge}
                  </Badge>
                </div>
                <p className="text-[11px] text-[#94a3b8] line-clamp-2">
                  {preset.tagline}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1e293b]/50 text-[11px] text-[#64748b]">
                <span className="flex items-center gap-1 font-mono">
                  <House size={12} />
                  {preset.data.square_feet.toLocaleString()} sq ft
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Compass size={12} />
                  {preset.data.neighborhood}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
