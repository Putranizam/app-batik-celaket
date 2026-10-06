import React from "react";
import BatikLogo from "./BatikLogo";
import BatikPattern from "./BatikPattern";
import { X, Sparkles, ShoppingBag, BookOpen, MapPin, Phone, ShieldCheck, ChevronRight } from "lucide-react";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen?: (screen: "welcome" | "login" | "signup") => void;
}

export default function NavDrawer({
  isOpen,
  onClose,
  onNavigateToScreen,
}: NavDrawerProps) {
  if (!isOpen) return null;

  const menuItems = [
    { icon: Sparkles, title: "Koleksi Eksklusif", desc: "Motif mahakarya Malang terbaru" },
    { icon: ShoppingBag, title: "Katalog Busana & Kain", desc: "Batik Tulis & Batik Cap Premium" },
    { icon: BookOpen, title: "Filosofi Batik Celaket", desc: "Warisan budaya & makna historis" },
    { icon: MapPin, title: "Galeri & Workshop", desc: "Jl. Jaksa Agung Suprapto, Malang" },
    { icon: ShieldCheck, title: "Sertifikasi Otentik", desc: "Jaminan 100% karya pengrajin lokal" },
    { icon: Phone, title: "Layanan Pelanggan", desc: "Konsultasi & pesanan khusus" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-sm h-full bg-[#271915] text-[#ECE2D3] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 z-10 border-l border-[#C5A059]/25">
        <BatikPattern opacity={0.06} />

        {/* Top Header */}
        <div className="p-6 border-b border-[#C5A059]/20 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <BatikLogo size={38} variant="dark-card" />
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-[#F9F5EF] leading-tight">
                Batik Celaket
              </h3>
              <p className="text-[10px] tracking-widest text-[#C5A059] uppercase">
                Malang, Jawa Timur
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-cream-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-[#F5D78E]" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2 relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A79282] px-3 mb-2">
            Menu Utama
          </p>

          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={onClose}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/8 active:bg-white/12 transition-all text-left group cursor-pointer border border-transparent hover:border-[#C5A059]/20"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#3A2620] flex items-center justify-center text-[#DFB96C] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F7EFE3] group-hover:text-[#F5D78E] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#A79282] line-clamp-1">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A79282] group-hover:text-[#F5D78E] group-hover:translate-x-0.5 transition-all" />
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#C5A059]/20 mt-4 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A79282] px-3">
              Akses Cepat Layar
            </p>
            <div className="grid grid-cols-2 gap-2 px-1">
              <button
                onClick={() => {
                  onNavigateToScreen?.("login");
                  onClose();
                }}
                className="py-2.5 px-3 rounded-lg bg-[#3B2822] hover:bg-[#48332B] text-xs font-semibold text-[#F7EFE3] border border-[#C5A059]/30 transition-all text-center cursor-pointer"
              >
                Halaman Masuk
              </button>
              <button
                onClick={() => {
                  onNavigateToScreen?.("signup");
                  onClose();
                }}
                className="py-2.5 px-3 rounded-lg bg-[#C5A059] hover:bg-[#B38D47] text-xs font-semibold text-[#251713] transition-all text-center cursor-pointer shadow-sm"
              >
                Daftar Akun
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-5 border-t border-[#C5A059]/20 bg-[#211410] relative z-10 text-center">
          <p className="text-xs text-[#B5A496]">
            © {new Date().getFullYear()} Batik Celaket Malang.
          </p>
          <p className="text-[10px] text-[#867466] mt-0.5">
            Melestarikan Nilai Luhur Budaya Nusantara
          </p>
        </div>
      </div>
    </div>
  );
}
