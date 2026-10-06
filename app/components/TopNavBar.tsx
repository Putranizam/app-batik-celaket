import React from "react";
import BatikLogo from "./BatikLogo";
import { Menu } from "lucide-react";

interface TopNavBarProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  className?: string;
}

export default function TopNavBar({
  onMenuClick,
  onLogoClick,
  className = "",
}: TopNavBarProps) {
  return (
    <header
      className={`w-full flex items-center justify-between px-6 pt-5 pb-3 z-10 ${className}`}
    >
      {/* Brand logo & name */}
      <button
        type="button"
        onClick={onLogoClick}
        className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none transition-transform active:scale-95"
      >
        <BatikLogo size={32} variant="dark-card" className="group-hover:scale-105 transition-transform" />
        <span className="font-serif-luxury font-bold text-[19px] tracking-tight text-[#2B1D19]">
          Batik Celaket
        </span>
      </button>

      {/* Hamburger menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Menu Navigasi"
        className="w-10 h-10 rounded-full bg-[#E4D8C4] hover:bg-[#DCD0BB] active:scale-90 flex items-center justify-center text-[#2B1D19] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 cursor-pointer"
      >
        <Menu className="w-5 h-5 stroke-[2.2]" />
      </button>
    </header>
  );
}
