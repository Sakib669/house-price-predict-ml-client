"use client";

import React, { useEffect, useState } from "react";
import { checkBackendHealth } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Sparkle, Cpu, ChartLineUp } from "@phosphor-icons/react";

export function Navbar({ onSelectPreset }: { onSelectPreset?: (id: string) => void }) {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    const verifyStatus = async () => {
      const res = await checkBackendHealth();
      if (mounted) {
        setApiOnline(res.ok);
      }
    };

    verifyStatus();
    const interval = setInterval(verifyStatus, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e293b]/80 bg-[#060814]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0000F2] via-[#0000F2] to-[#00D2FF] p-0.5 shadow-lg shadow-[#0000F2]/30">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#060814]">
              <Sparkle weight="fill" className="h-5 w-5 text-[#00D2FF]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">
                HERMES
              </span>
              <span className="rounded bg-[#0000F2]/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#00D2FF] border border-[#0000F2]/40">
                VALUATE
              </span>
            </div>
            <p className="text-[11px] text-[#64748b] hidden sm:block">
              Machine Learning Property Valuation
            </p>
          </div>
        </div>

        {/* Center / Stats info */}
        <div className="hidden md:flex items-center gap-6 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-[#3b82f6]" />
            <span>Random Forest Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChartLineUp size={14} className="text-[#00D2FF]" />
            <span>R² 0.895 Holdout Precision</span>
          </div>
        </div>

        {/* Right connectivity & actions */}
        <div className="flex items-center gap-3">
          {apiOnline === null ? (
            <Badge variant="outline" className="text-[11px] py-1 border-[#1e293b] text-[#64748b]">
              Connecting...
            </Badge>
          ) : apiOnline ? (
            <Badge variant="success" className="text-[11px] py-1 gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              API Connected
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[11px] py-1 gap-1.5 font-medium" title="Using local regression model fallback">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Local Mode
            </Badge>
          )}

          <a
            href="https://github.com/Sakib669/house-price-predict-ml-client"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#1e293b] bg-[#101733] px-3 py-1.5 text-xs font-medium text-[#ededf2] transition-colors hover:border-[#0000F2]/50 hover:bg-[#131b3e]"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
