"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HouseFeaturesInput } from "@/types/prediction";
import { Cube, Eye, ArrowsClockwise, Compass, Sparkle } from "@phosphor-icons/react";

interface SpatialModelPreviewProps {
  features: HouseFeaturesInput;
}

type ViewAngle = "isometric" | "elevation" | "plan" | "perspective";

export function SpatialModelPreview({ features }: SpatialModelPreviewProps) {
  const [viewAngle, setViewAngle] = useState<ViewAngle>("isometric");
  const [autoRotate, setAutoRotate] = useState(false);

  // Dynamic dimension calculations based on features
  const sqft = features.square_feet || 1500;
  const bedrooms = features.bedrooms || 3;
  const bathrooms = features.bathrooms || 2;
  const hasGarden = features.has_garden === "Yes";
  const condition = features.condition;

  // Scale factors
  const volumeScale = Math.min(1.4, Math.max(0.75, Math.sqrt(sqft / 2000)));
  const buildingHeight = Math.round(50 + (bedrooms > 3 ? 35 : 15) * volumeScale);
  const buildingWidth = Math.round(110 * volumeScale);
  const buildingDepth = Math.round(100 * volumeScale);

  const getTransform = () => {
    switch (viewAngle) {
      case "isometric":
        return "rotateX(58deg) rotateZ(-38deg) rotateY(4deg)";
      case "elevation":
        return "rotateX(0deg) rotateZ(0deg) rotateY(0deg)";
      case "plan":
        return "rotateX(90deg) rotateZ(0deg)";
      case "perspective":
        return "rotateX(30deg) rotateZ(-20deg) rotateY(15deg)";
    }
  };

  const getConditionColor = () => {
    switch (condition) {
      case "Excellent":
        return {
          glow: "rgba(0, 210, 255, 0.45)",
          edge: "#00D2FF",
          wall: "rgba(0, 0, 242, 0.28)",
          label: "Pristine Architectural Grade",
        };
      case "Very Good":
        return {
          glow: "rgba(59, 130, 246, 0.35)",
          edge: "#3B82F6",
          wall: "rgba(30, 58, 138, 0.24)",
          label: "Premium Standard",
        };
      case "Good":
        return {
          glow: "rgba(0, 0, 242, 0.25)",
          edge: "#0000F2",
          wall: "rgba(15, 23, 42, 0.4)",
          label: "Sound Envelope",
        };
      default:
        return {
          glow: "rgba(245, 158, 11, 0.2)",
          edge: "#F59E0B",
          wall: "rgba(69, 26, 3, 0.3)",
          label: "Renovation Candidate",
        };
    }
  };

  const condStyle = getConditionColor();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#182343] bg-gradient-to-b from-[#090e24]/95 via-[#060814] to-[#04060f] p-5 backdrop-blur-2xl shadow-2xl space-y-4">
      {/* Top Header / View Controller */}
      <div className="flex items-center justify-between border-b border-[#182343]/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0000F2]/20 border border-[#0000F2]/40 text-[#00D2FF]">
            <Cube size={16} weight="duotone" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Spatial Volume Model
            </h4>
            <p className="text-[10px] text-[#8a99b5] font-mono">
              3D Form Factor & Envelope
            </p>
          </div>
        </div>

        {/* Camera Angle Selector */}
        <div className="flex items-center gap-1 rounded-lg border border-[#182343] bg-[#0d132b]/80 p-0.5">
          {(["isometric", "elevation", "plan", "perspective"] as ViewAngle[]).map((angle) => (
            <button
              key={angle}
              type="button"
              onClick={() => setViewAngle(angle)}
              className={`rounded px-2 py-1 text-[10px] font-medium capitalize transition-all cursor-pointer ${
                viewAngle === angle
                  ? "bg-[#0000F2] text-white shadow-sm"
                  : "text-[#8a99b5] hover:text-white"
              }`}
            >
              {angle === "isometric" ? "Iso 3D" : angle}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Viewport Stage */}
      <div className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-[#182343]/50 bg-[#04060f]/90 bg-grid-cad">
        {/* Ambient volumetric lighting */}
        <div
          className="pointer-events-none absolute h-40 w-40 rounded-full blur-[75px] transition-all duration-700"
          style={{ background: condStyle.glow }}
        />

        {/* 3D Stage Container */}
        <motion.div
          animate={{
            transform: getTransform(),
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1200,
          }}
          className="relative flex items-center justify-center"
        >
          {/* Ground Parcel Plane */}
          <div
            style={{
              width: 220,
              height: 220,
              transform: "translateZ(0px)",
              background: hasGarden
                ? "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.8) 70%)"
                : "radial-gradient(circle, rgba(30, 41, 59, 0.4) 0%, rgba(6, 8, 20, 0.9) 80%)",
              border: `1px dashed ${hasGarden ? "rgba(16, 185, 129, 0.4)" : "rgba(30, 41, 59, 0.8)"}`,
              borderRadius: "16px",
            }}
            className="absolute flex items-center justify-center shadow-2xl"
          >
            {/* Grid coordinates inside parcel */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-[#64748b]">
              LOT: {features.lot_square_feet.toLocaleString()} SQFT
            </div>
            {hasGarden && (
              <div className="absolute bottom-2 right-2 rounded bg-emerald-500/10 border border-emerald-500/30 px-1 text-[8px] font-mono text-emerald-400">
                GARDEN ENVELOPE
              </div>
            )}
          </div>

          {/* Ground Floor 3D Extrusion */}
          <div
            style={{
              width: buildingWidth,
              height: buildingDepth,
              transform: `translateZ(${buildingHeight / 2}px)`,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            {/* Top Roof Slab */}
            <div
              style={{
                width: buildingWidth,
                height: buildingDepth,
                transform: `translateZ(${buildingHeight / 2}px)`,
                background: "linear-gradient(135deg, rgba(0, 0, 242, 0.5) 0%, rgba(0, 210, 255, 0.3) 100%)",
                border: `1.5px solid ${condStyle.edge}`,
                boxShadow: `0 0 20px ${condStyle.glow}`,
              }}
              className="absolute inset-0 rounded-md backdrop-blur-sm flex items-center justify-center text-center p-1"
            >
              <div className="font-mono text-[10px] font-bold text-white tracking-wider">
                {features.property_type.toUpperCase()}
              </div>
            </div>

            {/* Front Wall */}
            <div
              style={{
                width: buildingWidth,
                height: buildingHeight,
                transform: `rotateX(-90deg) translateZ(${buildingDepth / 2}px)`,
                transformOrigin: "bottom",
                background: condStyle.wall,
                border: `1px solid ${condStyle.edge}`,
                bottom: 0,
              }}
              className="absolute left-0 backdrop-blur-sm flex flex-col justify-end p-2 border-opacity-70"
            >
              <div className="flex gap-1.5 justify-center">
                {Array.from({ length: Math.min(bedrooms, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-3 rounded-xs border border-[#00D2FF]/60 bg-[#00D2FF]/20"
                  />
                ))}
              </div>
            </div>

            {/* Right Wall */}
            <div
              style={{
                width: buildingDepth,
                height: buildingHeight,
                transform: `rotateY(90deg) translateZ(${buildingWidth / 2}px)`,
                transformOrigin: "right",
                background: "rgba(10, 16, 40, 0.6)",
                border: `1px solid ${condStyle.edge}`,
                right: 0,
              }}
              className="absolute top-0 backdrop-blur-sm border-opacity-50"
            />
          </div>

          {/* Second Story Tier (if bedrooms >= 4 or sqft >= 2400) */}
          {(bedrooms >= 4 || sqft >= 2400) && (
            <div
              style={{
                width: buildingWidth * 0.72,
                height: buildingDepth * 0.72,
                transform: `translateZ(${buildingHeight + 18}px)`,
                transformStyle: "preserve-3d",
              }}
              className="absolute"
            >
              <div
                style={{
                  width: buildingWidth * 0.72,
                  height: buildingDepth * 0.72,
                  background: "linear-gradient(135deg, rgba(0, 210, 255, 0.4), rgba(0, 0, 242, 0.4))",
                  border: `1.5px solid ${condStyle.edge}`,
                  boxShadow: `0 0 16px ${condStyle.glow}`,
                }}
                className="absolute inset-0 rounded-xs flex items-center justify-center"
              >
                <span className="font-mono text-[8px] text-white">UPPER LEVEL</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Viewport Floating HUD Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-[10px] text-[#8a99b5]">
          <span className="text-white font-bold">{features.neighborhood}</span>
          <span>{features.square_feet.toLocaleString()} SQ FT CONDITIONED</span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[#182343] bg-[#090e24]/90 px-2.5 py-1 text-[10px] font-mono text-[#00D2FF]">
          <Sparkle size={12} weight="fill" />
          <span>{condStyle.label}</span>
        </div>
      </div>

      {/* Dimensional Breakdown Matrix */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="rounded-lg border border-[#182343]/60 bg-[#0d132b]/60 p-2 space-y-0.5">
          <span className="text-[10px] text-[#64748b] block">Footprint Scale</span>
          <span className="font-bold text-white">
            {Math.round(features.square_feet / (bedrooms >= 4 ? 2 : 1))} sq ft/fl
          </span>
        </div>
        <div className="rounded-lg border border-[#182343]/60 bg-[#0d132b]/60 p-2 space-y-0.5">
          <span className="text-[10px] text-[#64748b] block">Bed/Bath Ratio</span>
          <span className="font-bold text-[#00D2FF]">
            {features.bedrooms}B / {features.bathrooms}BA
          </span>
        </div>
        <div className="rounded-lg border border-[#182343]/60 bg-[#0d132b]/60 p-2 space-y-0.5">
          <span className="text-[10px] text-[#64748b] block">Lot Coverage</span>
          <span className="font-bold text-emerald-400">
            {Math.round((features.square_feet / (features.lot_square_feet || 1)) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
