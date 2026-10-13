"use client";

import React from "react";
import Link from "next/link";
import DesktopNavbar from "../../components/DesktopNavbar";
import { UserOrderTable } from "./components/Table";
import { ShoppingBag, Clock, CheckCircle2, ChevronRight } from "lucide-react";

export default function PesananPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
      {/* Top Navigation */}
      <DesktopNavbar activeTab="pesanan" />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Breadcrumb & Header */}
        <div>
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link
              href="/beranda"
              className="hover:text-[#2C1E1A] transition-colors"
            >
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#a89280]" />
            <span className="text-[#2C1E1A] font-semibold">Pesanan Saya</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
                Pesanan Saya
              </h1>
              <p className="text-xs sm:text-sm text-[#8a7060] mt-1 font-normal">
                Pantau riwayat transaksi, status pengerjaan batik, dan nomor resi pengiriman Anda.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-white border border-[#ede3d5] rounded-xl px-3.5 py-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] text-[#966431] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#8a7060] font-medium uppercase tracking-wider">Total</p>
                  <p className="text-xs sm:text-sm font-bold text-[#2C1E1A]">6 Pesanan</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white border border-[#ede3d5] rounded-xl px-3.5 py-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#8a7060] font-medium uppercase tracking-wider">Diproses</p>
                  <p className="text-xs sm:text-sm font-bold text-[#2C1E1A]">2 Aktif</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white border border-[#ede3d5] rounded-xl px-3.5 py-2 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#8a7060] font-medium uppercase tracking-wider">Selesai</p>
                  <p className="text-xs sm:text-sm font-bold text-[#2C1E1A]">3 Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Riwayat Pesanan User */}
        <section aria-label="Tabel Riwayat Pesanan" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#2C1E1A]">
              Daftar Riwayat Transaksi
            </h2>
            <span className="text-xs text-[#8a7060]">
              Terakhir diperbarui hari ini
            </span>
          </div>

          {/* Component Render */}
          <UserOrderTable />
        </section>
      </main>
    </div>
  );
}
