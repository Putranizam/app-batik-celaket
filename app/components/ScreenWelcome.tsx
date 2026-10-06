"use client";

import React from "react";
import BatikLogo from "./BatikLogo";
import BatikPattern from "./BatikPattern";
import { ArrowRight } from "lucide-react";

interface ScreenWelcomeProps {
  onExplore?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

export default function ScreenWelcome({
  onExplore,
  onLogin,
  onSignup,
}: ScreenWelcomeProps) {
  return (
    <div className="min-h-screen w-full bg-[#F9F6F0] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#C5A059]/20">
      {/* Centered Card — same dimensions & style as Login */}
      <div className="w-full max-w-[440px] bg-[#F4EFE6] rounded-3xl shadow-xs border border-[#EBE4D8] overflow-hidden">
        {/* ── Banner Header: Deep mocha with batik pattern ── */}
        <div className="relative bg-[#261713] rounded-t-[24px] px-8 pt-10 pb-8 flex flex-col items-center text-center overflow-hidden">
          {/* Kawung watermark */}
          <BatikPattern opacity={0.07} />

          {/* Ambient gold glow */}
          <div className="absolute w-44 h-44 rounded-full bg-[#DFB96C]/10 blur-2xl pointer-events-none" />

          {/* Logo + brand */}
          <div className="relative z-10 flex flex-col items-center">
            <BatikLogo size={68} variant="dark-card" className="mb-3" />

            <h1 className="font-serif-luxury font-bold text-[28px] tracking-normal text-[#F9F5EF] leading-tight drop-shadow-sm">
              Batik Celaket
            </h1>

            <p className="font-sans-modern text-[10px] font-semibold tracking-[0.28em] text-[#C5A059] uppercase mt-1">
              WARISAN BUDAYA MALANG
            </p>
          </div>
        </div>

        {/* ── Card Body: Cream content area ── */}
        <div className="px-8 sm:px-10 pt-7 pb-8 flex flex-col">
          {/* Content Header */}
          <div className="flex flex-col items-center text-center">
            {/* KOLEKSI EKSKLUSIF Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE1D0] border border-[#C5A059]/40 mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="font-sans-modern text-[10px] font-bold tracking-widest text-[#2B1D19] uppercase">
                KOLEKSI EKSKLUSIF
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-luxury font-bold text-[22px] text-[#2C1E1A] leading-snug tracking-tight max-w-[280px]">
              Keindahan Mahakarya Tradisi Nusantara
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-[12.5px] text-[#6c584c] leading-relaxed mt-2.5 max-w-[290px]">
              Temukan pesona motif otentik Celaket Malang yang dipadukan dengan
              sentuhan elegan busana modern.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5">
            {/* Primary: JELAJAHI SEKARANG */}
            <button
              type="button"
              onClick={onExplore || onLogin}
              className="w-full h-12 rounded-xl bg-[#4A2E1B] hover:bg-[#3b2415] active:scale-[0.99] text-[#F9F5EF] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer group"
            >
              <span>JELAJAHI SEKARANG</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] text-[#F9F5EF] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary: Sudah punya akun? Masuk */}
            <button
              type="button"
              onClick={onLogin}
              className="w-full h-12 rounded-xl bg-white hover:bg-[#FAF7F2] active:scale-[0.99] text-[#2C1E1A] font-semibold text-sm flex items-center justify-center shadow-xs border border-[#ded4c5] transition-all cursor-pointer"
            >
              Sudah punya akun? Masuk
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-[#78675c] mt-6">
            Baru di Batik Celaket?{" "}
            <button
              type="button"
              onClick={onSignup}
              className="text-[#2C1E1A] font-bold hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Daftar Akun
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
