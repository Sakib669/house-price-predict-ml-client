import React from "react";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b]/70 bg-[#060814] py-8 text-xs text-[#64748b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0000F2]">
            <Sparkle size={12} weight="fill" className="text-white" />
          </div>
          <span className="font-semibold text-white">HERMES VALUATE</span>
          <span className="text-[#475569]">/</span>
          <span>House Price Prediction Frontend</span>
        </div>

        <div className="flex items-center gap-6">
          <span>Powered by FastAPI & Random Forest</span>
          <a
            href="https://github.com/Sakib669/house-price-predict-ml-client"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#00D2FF] transition-colors"
          >
            Repository
          </a>
        </div>
      </div>
    </footer>
  );
}
