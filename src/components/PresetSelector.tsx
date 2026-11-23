"use client";

import React from "react";
import { PRESET_PROPERTIES } from "@/lib/presets";
import { PresetProperty } from "@/types/prediction";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { House, Compass, Sparkle, ArrowUpRight } from "@phosphor-icons/react";

interface PresetSelectorProps {
  activePresetId?: string;
  onSelect: (preset: PresetProperty) => void;
}

export function PresetSelector({ activePresetId, onSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#182343]/60 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#00D2FF]/10 text-[#00D2FF]">
            <Sparkle size={13} weight="fill" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#f1f2f8]">
            Architectural Archetype Scenarios
          </h4>
        </div>
        <span className="text-[11px] font-mono text-[#8a99b5]">
          Select to load parameters into 3D engine
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRESET_PROPERTIES.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onSelect(preset)}
              className="cursor-pointer"
            >
              <TiltCard
                maxTilt={8}
                glowColor={isSelected ? "rgba(0, 0, 242, 0.45)" : "rgba(0, 210, 255, 0.22)"}
                className={`group h-full p-4 transition-all duration-300 ${
                  isSelected
                    ? "border-[#0000F2] bg-[#0d1538]/90 ring-1 ring-[#0000F2] shadow-xl shadow-[#0000F2]/25"
                    : "hover:border-[#00D2FF]/50 hover:bg-[#0c122e]/80"
                }`}
              >
                <div className="flex flex-col justify-between h-full space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={isSelected ? "cyan" : "outline"}
                        className="text-[10px] py-0.5 px-2 font-mono font-medium"
                      >
                        {preset.badge}
                      </Badge>
                      <ArrowUpRight
                        size={14}
                        className={`transition-transform duration-200 ${
                          isSelected ? "text-[#00D2FF] translate-x-0.5 -translate-y-0.5" : "text-[#64748b] group-hover:text-white"
                        }`}
                      />
                    </div>

                    <h5
                      style={{ transform: "translateZ(18px)" }}
                      className="text-sm font-bold text-white group-hover:text-[#00D2FF] transition-colors"
                    >
                      {preset.title}
                    </h5>

                    <p className="text-[11px] text-[#8a99b5] leading-relaxed line-clamp-2">
                      {preset.tagline}
                    </p>
                  </div>

                  <div
                    style={{ transform: "translateZ(10px)" }}
                    className="pt-2.5 border-t border-[#182343]/70 flex items-center justify-between text-[11px] text-[#8a99b5] font-mono"
                  >
                    <span className="flex items-center gap-1.5">
                      <House size={13} className="text-[#00D2FF]" />
                      {preset.data.square_feet.toLocaleString()} sq ft
                    </span>
                    <span className="flex items-center gap-1.5 text-white/90">
                      <Compass size={13} className="text-[#3B82F6]" />
                      {preset.data.neighborhood}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
