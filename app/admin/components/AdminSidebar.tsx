"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BatikLogo from "@/app/components/BatikLogo";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  Heart,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Pesanan",
    href: "/admin/pesanan",
    icon: Package,
  },
  {
    name: "Produk",
    href: "/admin/produk",
    icon: ShoppingBag,
  },
  {
    name: "Pelanggan",
    href: "/admin/pelanggan",
    icon: Users,
  },
  {
    name: "Laporan",
    href: "/admin/laporan",
    icon: FileText,
  },
  {
    name: "Ulasan",
    href: "/admin/ulasan",
    icon: Heart,
  },
  {
    name: "Pengaturan",
    href: "/admin/pengaturan",
    icon: Settings,
  },
];

import { useAuth } from "@/app/context/AuthContext";
import { LogOut, Store } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout, getInitials } = useAuth();

  const adminName = user?.namaLengkap || "PROFIL ADMIN";
  const adminEmail = user?.email || "ADMIN1@EXAMPLE.COM";
  const initials = getInitials(adminName);

  return (
    <aside className="w-[260px] min-w-[260px] bg-[#3D2817] text-[#FAF7F2] flex flex-col justify-between h-screen sticky top-0 border-r border-[#523722]/30 select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
        {/* Top Branding Card - Pale Cream Rounded Box like in images */}
        <div className="p-4 pt-5">
          <div className="bg-[#FAF7F2] rounded-2xl py-3 px-4 flex flex-col items-center justify-center shadow-sm">
            <BatikLogo size={42} variant="dark-card" />
            <h1 className="font-serif text-lg font-bold text-[#3D2817] mt-1.5 tracking-wide">
              Batik Celaket
            </h1>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="px-3 py-2 space-y-1.5 flex-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-inner"
                    : "text-[#FAF7F2]/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0 opacity-90" strokeWidth={2} />
                <span className="tracking-wide text-[15px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Sidebar: Quick Switcher 'Lihat Toko' + Profile Card Admin with interactive Logout */}
      <div className="p-3 border-t border-[#523722]/40 bg-[#342213] space-y-2.5">
        {/* Tombol Lihat Toko (Quick Switcher ke Halaman Pembeli) */}
        <Link
          href="/beranda"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] font-semibold text-xs transition-all border border-[#FAF7F2]/15 active:scale-[0.98]"
        >
          <Store className="w-3.5 h-3.5 text-[#DFB96C]" />
          <span>Lihat Toko</span>
        </Link>

        <div className="flex items-center justify-between p-1.5 pt-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2] font-bold text-xs shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden leading-tight">
              <p className="text-xs font-bold tracking-wider text-[#FAF7F2] uppercase truncate max-w-[125px]">
                {adminName}
              </p>
              <p className="text-[10px] text-[#FAF7F2]/70 font-mono truncate max-w-[125px]">
                {adminEmail}
              </p>
            </div>
          </div>

          {/* Tombol Logout Admin */}
          <button
            onClick={() => logout("/login")}
            title="Keluar dari Akun Admin"
            className="w-8 h-8 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 flex items-center justify-center transition-all cursor-pointer border border-red-800/30 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
