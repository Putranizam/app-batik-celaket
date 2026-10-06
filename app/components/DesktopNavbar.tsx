"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BatikLogo from "./BatikLogo";
import { User, Menu, X, LogOut, ShieldCheck } from "lucide-react";

import { useAuth } from "../context/AuthContext";

interface DesktopNavbarProps {
  activeTab?: "beranda" | "produk" | "keranjang" | "pesanan" | "tentang" | "akun";
}

export default function DesktopNavbar({ activeTab }: DesktopNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, getInitials, isSuperAdmin } = useAuth();

  const displayName = user?.namaLengkap || user?.username || "Akun Saya";
  const initials = getInitials(displayName);

  const navItems = [
    { key: "beranda", href: "/beranda", label: "Beranda" },
    { key: "produk", href: "/produk", label: "Produk" },
    { key: "keranjang", href: "/keranjang", label: "Keranjang" },
    { key: "pesanan", href: "/pesanan", label: "Pesanan" },
    { key: "tentang", href: "/tentang", label: "Tentang Kami" },
  ];

  const currentKey =
    activeTab ||
    (pathname.startsWith("/profil") || pathname.startsWith("/pengaturan-akun")
      ? "akun"
      : pathname.startsWith("/produk")
      ? "produk"
      : pathname.startsWith("/keranjang") || pathname.startsWith("/checkout")
      ? "keranjang"
      : pathname.startsWith("/pesanan")
      ? "pesanan"
      : pathname.startsWith("/tentang")
      ? "tentang"
      : "beranda");

  return (
    <header className="w-full bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ece2d3] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/beranda" className="flex items-center gap-2.5 sm:gap-3.5 group">
          <BatikLogo size={32} variant="dark-card" className="group-hover:scale-105 transition-transform sm:w-9 sm:h-9" />
          <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2C1E1A] tracking-tight">
            Batik Celaket
          </span>
        </Link>

        {/* Center Navigation Links (Desktop: md ke atas) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3.5 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#f1e7d8] text-[#c5a059] font-bold shadow-xs"
                    : "text-[#6c584c] hover:text-[#2C1E1A] hover:bg-[#f5ede1]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Switcher: Panel Admin (Khusus SUPER_ADMIN) */}
          {isSuperAdmin && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-bold bg-[#3D2817] text-[#FAF7F2] hover:bg-[#523722] shadow-sm transition-all border border-[#C5A059]/40 active:scale-95"
              title="Akses Langsung ke Panel Admin"
            >
              <ShieldCheck size={14} className="text-[#DFB96C]" />
              <span className="hidden sm:inline">Panel Admin</span>
            </Link>
          )}

          {/* Akun Saya Pill */}
          <Link
            href="/profil"
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all ${
              currentKey === "akun"
                ? "bg-[#f1e7d8] text-[#c5a059] font-bold border border-[#dfb96c]/50 shadow-xs"
                : "bg-[#f4efe6] hover:bg-[#ece2d3] border border-[#e2d5c2] text-[#2C1E1A]"
            }`}
          >
            {user?.namaLengkap ? (
              <span className="w-5 h-5 rounded-full bg-[#3D2817] text-[#FAF7F2] text-[10px] flex items-center justify-center font-bold">
                {initials}
              </span>
            ) : (
              <User size={14} className={currentKey === "akun" ? "text-[#c5a059]" : "text-[#3b2a1a]"} />
            )}
            <span className="hidden xs:inline sm:inline max-w-[130px] truncate">
              {displayName}
            </span>
          </Link>

          {/* Hamburger Menu Toggle (Mobile: dibawah md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[#f4efe6] border border-[#e2d5c2] flex items-center justify-center text-[#2C1E1A] hover:bg-[#ece2d3] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ece2d3] bg-[#faf7f2] px-4 py-3 shadow-lg space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = currentKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#f1e7d8] text-[#c5a059] font-bold"
                    : "text-[#6c584c] hover:bg-[#f5ede1] hover:text-[#2C1E1A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {isSuperAdmin && (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#3D2817] text-[#FAF7F2] hover:bg-[#523722] mt-2 mb-1"
            >
              <ShieldCheck size={16} className="text-[#DFB96C]" />
              <span>Panel Admin</span>
            </Link>
          )}

          {user && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                logout("/login");
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 mt-2 border-t border-[#ece2d3] pt-3 transition-colors"
            >
              <LogOut size={16} />
              <span>Keluar dari Akun</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
