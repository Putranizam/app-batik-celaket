import React from "react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
  label?: string;
  badge?: string;
  isDarkStatusBar?: boolean;
  showBezel?: boolean;
  className?: string;
}

export default function PhoneFrame({
  children,
  label,
  badge,
  isDarkStatusBar = false,
  showBezel = true,
  className = "",
}: PhoneFrameProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Label and Badge above phone */}
      {label && (
        <div className="mb-3.5 flex items-center gap-2">
          <span className="font-sans-modern text-[11px] font-bold tracking-widest text-[#DFC386] uppercase bg-[#2C1E1A] px-3 py-1 rounded-full border border-[#C5A059]/30 shadow-sm">
            {label}
          </span>
          {badge && (
            <span className="text-[10px] font-medium text-[#B8A698] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Outer Phone Bezel */}
      <div
        className={`relative transition-all duration-300 ${
          showBezel
            ? "p-[9px] rounded-[48px] bg-gradient-to-b from-[#4A3830] via-[#241712] to-[#120B08] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(223,195,134,0.18)] ring-1 ring-white/10"
            : "rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-[#C5A059]/20"
        }`}
      >
        {/* Subtle phone rim glare */}
        {showBezel && (
          <div className="absolute inset-0 rounded-[48px] pointer-events-none border border-white/10 overflow-hidden">
            <div className="absolute -top-24 left-1/4 w-40 h-40 bg-white/5 blur-xl transform -rotate-45" />
          </div>
        )}

        {/* Screen Canvas Container (375px x 740px responsive aspect) */}
        <div
          className={`relative w-[360px] sm:w-[375px] h-[720px] sm:h-[750px] overflow-hidden flex flex-col ${
            showBezel ? "rounded-[40px]" : "rounded-[32px]"
          }`}
        >
          {/* Native Status Bar */}
          <div
            className={`w-full h-8 px-6 pt-1 flex items-center justify-between z-30 select-none shrink-0 transition-colors ${
              isDarkStatusBar ? "text-[#F5EFE6]" : "text-[#2B1D19]"
            }`}
          >
            {/* Clock */}
            <span className="text-[11.5px] font-semibold tracking-tight font-sans-modern">
              09:41
            </span>

            {/* Dynamic Island / Notch Pill */}
            <div className="w-[84px] h-[18px] bg-[#120B08] rounded-full mx-auto flex items-center justify-center gap-1.5 px-2">
              <span className="w-2 h-2 rounded-full bg-[#1e130e]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#34241d]" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="relative flex-1 w-full h-[calc(100%-32px)] overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
