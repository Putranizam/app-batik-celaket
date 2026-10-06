import React from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import DashboardSalesChart from "./DashboardSalesChart";
import {
  Banknote,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  LineChart as LineChartIcon,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const statCards = [
    {
      title: "TOTAL OMZET",
      value: "RP 12.850.000",
      change: "12% DARI MINGGU LALU",
      icon: Banknote,
    },
    {
      title: "TOTAL PESANAN",
      value: "148 PESANAN",
      change: "8% DARI MINGGU LALU",
      icon: ShoppingBag,
    },
    {
      title: "PRODUK TERJUAL",
      value: "312 PCS",
      change: "15% DARI MINGGU LALU",
      icon: Package,
    },
    {
      title: "PELANGGAN BARU",
      value: "45 ORANG",
      change: "5% DARI MINGGU LALU",
      icon: Users,
    },
  ];

  const recentOrders = [
    {
      id: "#000125",
      customer: "MUHAMMAD RENDY",
      total: "RP 350.000",
      status: "BARU",
      badgeStyle: "bg-[#E6F0FA] text-[#1E5D88] border border-[#BFDBFE]",
    },
    {
      id: "#000124",
      customer: "FAISHAL NUR FIRDAUS",
      total: "RP 420.000",
      status: "DIPROSES",
      badgeStyle: "bg-[#FEF6E6] text-[#B45309] border border-[#FDE68A]",
    },
    {
      id: "#000123",
      customer: "NIZAM PUTRA RASYA",
      total: "RP 280.000",
      status: "DIKIRIM",
      badgeStyle: "bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]",
    },
    {
      id: "#000122",
      customer: "EVAN SWARDANA",
      total: "RP 560.000",
      status: "SELESAI",
      badgeStyle: "bg-[#EFF3F6] text-[#4B5563] border border-[#D1D5DB]",
    },
  ];

  const topProducts = [
    {
      name: "KEMEJA BATIK TULIS SEKAR JAGAD MALANG",
      sold: 42,
      progress: "84%",
    },
    {
      name: "BLOUSE BATIK MODERN MEGA MENDUNG GOLD",
      sold: 34,
      progress: "68%",
    },
    {
      name: "OUTER SLIK KEBAYA MOTIF PARANG KUSUMO",
      sold: 28,
      progress: "56%",
    },
  ];

  const lowStock = [
    {
      name: "KEMEJA BATIK TULIS SEKAR JAGAD MALANG",
      stock: 3,
    },
    {
      name: "BLOUSE BATIK MODERN MEGA MENDUNG GOLD",
      stock: 6,
    },
    {
      name: "OUTER SLIK KEBAYA MOTIF PARANG KUSUMO",
      stock: 5,
    },
  ];

  const recentActivities = [
    {
      text: "PESANAN #000125 BARU MASUK",
      time: "10.20",
      color: "bg-sky-400",
    },
    {
      text: "PELANGGAN BARU MENDAFTAR",
      time: "09.55",
      color: "bg-emerald-400",
    },
    {
      text: "PESANAN #000124 DIPROSES",
      time: "08.30",
      color: "bg-amber-400",
    },
    {
      text: "OMZET HARI INI MENCAPAI RP 12.850.000",
      time: "06.10",
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <PageHeaderBanner
        title="Selamat Datang, Admin!"
        description="Ini adalah ringkasan data Batik Celaket hari ini."
      />

      {/* 4 Stat Cards Dark */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#3D2817] text-white rounded-2xl p-5 shadow-sm border border-[#523722]/50 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-[#D5C2B1] uppercase">
                    {card.title}
                  </p>
                  <p className="text-xl font-bold text-white mt-1.5 tracking-tight">
                    {card.value}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FAF7F2] shrink-0">
                  <Icon className="w-4 h-4 opacity-80" />
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-[11px] text-emerald-400 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Line Chart Penjualan (Left) + Tabel Pesanan Terbaru (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sales Chart */}
        <div className="lg:col-span-7 bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3 text-[#3D2817]">
            <LineChartIcon className="w-4 h-4 opacity-80" />
            <h2 className="text-xs font-bold tracking-wider uppercase font-sans">
              GRAFIK PENJUALAN
            </h2>
          </div>
          <DashboardSalesChart />
        </div>

        {/* Tabel Pesanan Terbaru */}
        <div className="lg:col-span-5 bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4]">
          <div className="flex items-center gap-2 mb-3 text-[#3D2817]">
            <Calendar className="w-4 h-4 opacity-80" />
            <h2 className="text-xs font-bold tracking-wider uppercase font-sans">
              PESANAN TERBARU
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#D9CBB7] bg-[#EFE8DA]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D9CBB7] text-[#6E543C] font-semibold">
                  <th className="py-2.5 px-3">NO. PESANAN</th>
                  <th className="py-2.5 px-3">NAMA PELANGGAN</th>
                  <th className="py-2.5 px-3">TOTAL</th>
                  <th className="py-2.5 px-3 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DAC8] text-[#2C1E1A] font-medium">
                {recentOrders.map((ord, i) => (
                  <tr key={i} className="hover:bg-[#E8DFC8]/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-semibold text-[11px]">
                      {ord.id}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[11px] truncate max-w-[120px]">
                      {ord.customer}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[11px] whitespace-nowrap">
                      {ord.total}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${ord.badgeStyle}`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Col 1: Produk Terlaris */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4]">
          <div className="flex items-center gap-2 mb-4 text-[#3D2817]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-xs font-bold tracking-wider uppercase">
              PRODUK TERLARIS
            </h2>
          </div>

          <div className="space-y-4">
            {topProducts.map((prod, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {/* Thumbnail Batik Avatar */}
                <div className="w-10 h-10 rounded-xl bg-[#3D2817] flex items-center justify-center text-[#E8DFC8] shrink-0 border border-[#C5A059]/40 shadow-sm">
                  <span className="font-serif font-bold text-xs">BC</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-[#3D2817] truncate leading-tight">
                    {prod.name}
                  </p>
                  <p className="text-[10px] text-[#6E543C] font-semibold mt-0.5">
                    {prod.sold} TERJUAL
                  </p>
                  {/* Progress Bar */}
                  <div className="w-full bg-[#DED0BD] rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div
                      className="bg-[#523722] h-full rounded-full"
                      style={{ width: prod.progress }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Stok Hampir Habis */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4]">
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#3D2817] mb-3">
            STOK HAMPIR HABIS
          </h2>

          <div className="rounded-lg border border-[#D9CBB7] overflow-hidden bg-[#EFE8DA]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D9CBB7] text-[#6E543C] font-semibold text-[11px]">
                  <th className="py-2.5 px-3">PRODUK</th>
                  <th className="py-2.5 px-3 text-center">STOK TERSISA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DAC8] text-[#2C1E1A] text-[11px]">
                {lowStock.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#E8DFC8]/40">
                    <td className="py-2 px-3 font-semibold truncate max-w-[130px]">
                      {item.name}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-[#C2410C]">
                      {item.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 3: Aktivitas Terbaru */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4]">
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#3D2817] mb-4">
            AKTIVITAS TERBARU
          </h2>

          <div className="space-y-3.5">
            {recentActivities.map((act, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${act.color}`}
                  />
                  <span className="font-semibold text-[#3D2817] truncate">
                    {act.text}
                  </span>
                </div>
                <span className="text-[10px] text-[#8C735E] font-mono shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
