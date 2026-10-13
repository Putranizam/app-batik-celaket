"use client";

import React from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import ReportBarChart from "./components/ReportBarChart";
import ReportDonutChart from "./components/ReportDonutChart";
import {
  Download,
  Calendar,
  ChevronDown,
  TrendingUp,
  Globe,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

export default function AdminLaporanPage() {
  const periode = "01 - 30 Juni 2026";
  const saluran = "All";

  const salesChannels = [
    {
      name: "Website Official",
      icon: Globe,
      iconColor: "text-sky-600",
      orders: "512 Pesanan",
      revenue: "Rp 55.400.000",
      contribution: "43%",
      status: "Optimal",
      statusColor: "text-emerald-700 bg-emerald-500",
    },
    {
      name: "Marketplace (Shopee/Tokopedia)",
      icon: ShoppingBag,
      iconColor: "text-pink-600",
      orders: "480 Pesanan",
      revenue: "Rp 48.100.000",
      contribution: "37%",
      status: "Stabil",
      statusColor: "text-emerald-700 bg-emerald-500",
    },
    {
      name: "WhatsApp / Direct Order",
      icon: MessageCircle,
      iconColor: "text-emerald-600",
      orders: "256 Pesanan",
      revenue: "Rp 25.000.000",
      contribution: "20%",
      status: "Meningkat",
      statusColor: "text-amber-700 bg-amber-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <PageHeaderBanner
        title="Laporan Penjualan & Analitik"
        description="Pantau performa bisnis, pendapatan, margin keuntungan, dan saluran distribusi"
      />

      {/* Row 1: 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pelanggan */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#6E543C] uppercase">
            TOTAL PELANGGAN
          </p>
          <p className="text-2xl font-bold text-[#3D2817] mt-1.5">
            842 Orang
          </p>
        </div>

        {/* Baru Bulan Ini - Light Green */}
        <div className="bg-[#EAF7EE] rounded-2xl p-5 border border-[#C5E9CD] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#166534] uppercase">
            BARU BULAN INI
          </p>
          <p className="text-2xl font-bold text-[#15803D] mt-1.5">
            +45 Orang
          </p>
        </div>

        {/* Pelanggan VIP - Light Yellow */}
        <div className="bg-[#FEF9E7] rounded-2xl p-5 border border-[#FDE68A] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#B45309] uppercase">
            PELANGGAN VIP
          </p>
          <p className="text-2xl font-bold text-[#D97706] mt-1.5">
            68 Orang
          </p>
        </div>

        {/* Rata-Rata Belanja */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#6E543C] uppercase">
            RATA-RATA BELANJA
          </p>
          <p className="text-2xl font-bold text-[#3D2817] mt-1.5">
            Rp 650.000
          </p>
        </div>
      </div>

      {/* Row 2: Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Periode Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 bg-[#F3ECE0] border border-[#D9CBB7] px-4 py-2.5 rounded-xl text-xs font-semibold text-[#3D2817] shadow-sm hover:bg-[#EBE2D4]">
              <Calendar className="w-3.5 h-3.5 text-[#6E543C]" />
              <span>Periode: {periode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E543C] ml-1" />
            </button>
          </div>

          {/* Filter Saluran Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 bg-[#F3ECE0] border border-[#D9CBB7] px-4 py-2.5 rounded-xl text-xs font-semibold text-[#3D2817] shadow-sm hover:bg-[#EBE2D4]">
              <span>Filter Saluran: {saluran}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E543C] ml-1" />
            </button>
          </div>
        </div>

        {/* Unduh Laporan PDF Button */}
        <button className="flex items-center gap-2 bg-[#3D2817] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow hover:bg-[#523722] active:scale-[0.98] transition-all">
          <Download className="w-4 h-4" />
          <span>Unduh Laporan PDF</span>
        </button>
      </div>

      {/* Row 3: Grid Finansial 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pendapatan Bersih */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#6E543C] uppercase">
              PENDAPATAN BERSIH
            </p>
            <p className="text-xl font-bold text-[#3D2817] mt-1.5">
              Rp 128.500.000
            </p>
          </div>
          <div className="flex items-center gap-1 mt-3 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            <span>+14% dibanding Mei</span>
          </div>
        </div>

        {/* Keuntungan Bersih (Green card style) */}
        <div className="bg-[#EAF7EE] rounded-2xl p-5 border border-[#C5E9CD] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#166534] uppercase">
              KEUNTUNGAN BERSIH
            </p>
            <p className="text-xl font-bold text-[#15803D] mt-1.5">
              Rp 45.200.000
            </p>
          </div>
          <p className="text-[10px] font-bold text-[#166534] mt-3">
            Margin ~35%
          </p>
        </div>

        {/* Rata-Rata Transaksi */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#6E543C] uppercase">
              RATA-RATA TRANSAKSI
            </p>
            <p className="text-xl font-bold text-[#3D2817] mt-1.5">
              Rp 425.000
            </p>
          </div>
          <div className="flex items-center gap-1 mt-3 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            <span>+5% minggu ini</span>
          </div>
        </div>

        {/* Tingkat Konversi (Yellow border/style) */}
        <div className="bg-[#FEF9E7] rounded-2xl p-5 border border-[#FDE68A] flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#B45309] uppercase">
              TINGKAT KONVERSI
            </p>
            <p className="text-xl font-bold text-[#D97706] mt-1.5">
              3.8%
            </p>
          </div>
          <p className="text-[10px] font-medium text-[#B45309] mt-3">
            Dari total pengunjung
          </p>
        </div>
      </div>

      {/* Row 4: Charts Row (Bar Chart Ganda & Donut Chart Kategori) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tren Pendapatan & Keuntungan */}
        <div className="lg:col-span-8 bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-xs font-bold tracking-wider text-[#3D2817] uppercase">
              TREN PENDAPATAN & KEUNTUNGAN (JUNI 2026)
            </h2>
            <div className="flex items-center gap-4 text-[11px] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#3D2817]" />
                <span className="text-[#3D2817]">Pendapatan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#2E7D32]" />
                <span className="text-[#3D2817]">Keuntungan</span>
              </div>
            </div>
          </div>

          <ReportBarChart />
        </div>

        {/* Kategori Terlaris Donut */}
        <div className="lg:col-span-4 bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <h2 className="text-xs font-bold tracking-wider text-[#3D2817] uppercase mb-2">
            KATEGORI TERLARIS
          </h2>
          <ReportDonutChart />
        </div>
      </div>

      {/* Row 5: Tabel Saluran Penjualan */}
      <div className="rounded-2xl border border-[#D9CBB7] overflow-hidden bg-[#FAF7F2] shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#3D2817] text-[#FAF7F2] font-semibold text-[11px] tracking-wider uppercase">
              <th className="py-3.5 px-4 font-bold">SALURAN PENJUALAN</th>
              <th className="py-3.5 px-4 font-bold">TOTAL TRANSAKSI</th>
              <th className="py-3.5 px-4 font-bold">TOTAL PENDAPATAN</th>
              <th className="py-3.5 px-4 font-bold">KONTRIBUSI (%)</th>
              <th className="py-3.5 px-4 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADFCB] text-[#2C1E1A] font-medium bg-[#EFE8DA]">
            {salesChannels.map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <tr key={idx} className="hover:bg-[#E8DFC8]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-xs flex items-center gap-2.5 text-[#3D2817]">
                    <Icon className={`w-4 h-4 ${ch.iconColor}`} />
                    <span>{ch.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#4A3525] font-semibold">
                    {ch.orders}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#15803D]">
                    {ch.revenue}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#4A3525]">
                    {ch.contribution}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${ch.statusColor}`} />
                      <span className="text-[11px] font-bold text-[#3D2817]">
                        {ch.status}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
