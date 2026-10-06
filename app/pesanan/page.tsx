"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DesktopNavbar from "../components/DesktopNavbar";

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: "Sedang Dikirim" | "Menunggu Pembayaran" | "Selesai";
  productName: string;
  label: string;
  size: string;
  qty: number;
  price: string;
  total: string;
  img: string;
}

const ordersData: OrderItem[] = [
  {
    id: "1",
    orderNumber: "Pesanan #BC-240318-001",
    date: "18 Mar 2026 • 14:20 WIB",
    status: "Sedang Dikirim",
    productName: "Kemeja Batik Tulis Sekar Jagad",
    label: "TULIS",
    size: "Ukuran L",
    qty: 1,
    price: "Rp 680.000",
    total: "Rp 680.000",
    img: "/batik_tulis_sekar_jagad.jpg",
  },
  {
    id: "2",
    orderNumber: "Pesanan #BC-240318-002",
    date: "18 Mar 2026 • 15:05 WIB",
    status: "Menunggu Pembayaran",
    productName: "Blouse Batik Modern Mega Mendung",
    label: "MODERN",
    size: "Ukuran M",
    qty: 1,
    price: "Rp 450.000",
    total: "Rp 450.000",
    img: "/batik_modern_mega_mendung.jpg",
  },
  {
    id: "3",
    orderNumber: "Pesanan #BC-240317-003",
    date: "17 Mar 2026 • 09:30 WIB",
    status: "Selesai",
    productName: "Outer Silk Kebaya Motif Parang",
    label: "SILK",
    size: "Ukuran XL",
    qty: 1,
    price: "Rp 520.000",
    total: "Rp 520.000",
    img: "/batik_silk_kebaya_parang.jpg",
  },
];

export default function PesananPage() {
  const [activeTab, setActiveTab] = useState<"Semua" | "Menunggu Pembayaran" | "Dikirim">("Semua");

  const filteredOrders = ordersData.filter((order) => {
    if (activeTab === "Semua") return true;
    if (activeTab === "Menunggu Pembayaran") return order.status === "Menunggu Pembayaran";
    if (activeTab === "Dikirim") return order.status === "Sedang Dikirim";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
      {/* Top Navbar */}
      <DesktopNavbar activeTab="pesanan" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Pesanan Saya</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Pesanan Saya
          </h1>
          <p className="text-xs sm:text-sm text-[#8a7060] mt-1 font-normal">
            Pantau status pembelian dan pengiriman produk batik favoritmu.
          </p>
        </div>

        {/* Layout Terbagi Dua Kolom Asimetris */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= SIDEBAR KIRI (RINGKASAN) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-[#ede3d5] p-6 shadow-xs">
              <p className="text-xs font-bold text-[#8a7060] uppercase tracking-wider mb-2">
                Total Pesanan
              </p>
              {/* Angka Besar '3' Emas */}
              <p className="font-serif-luxury text-5xl font-bold text-[#C5A059] mb-4">
                3
              </p>

              {/* Badge Kapsul: 1 Sedang Dikirim berlatar krem terang */}
              <div className="inline-block px-3 py-1.5 rounded-full bg-[#fbf6ec] border border-[#dfb96c]/40 text-xs font-bold text-[#C5A059] mb-6 shadow-2xs">
                1 Sedang Dikirim
              </div>

              {/* Garis pembatas + teks kecil */}
              <div className="border-t border-[#ede3d5] pt-4">
                <p className="text-[11px] text-[#8a7060]">
                  Terakhir diperbarui hari ini
                </p>
              </div>
            </div>
          </div>

          {/* ================= KONTEN KANAN (DAFTAR PESANAN) ================= */}
          <div className="lg:col-span-9 space-y-6">
            {/* Filter Tab Kapsul */}
            <div className="flex items-center gap-3">
              {(["Semua", "Menunggu Pembayaran", "Dikirim"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#C5A059] text-[#2C1E1A] shadow-xs"
                        : "bg-[#f5ede1] text-[#6c584c] hover:bg-[#ede1d1] hover:text-[#2C1E1A]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* List 3 Card Pesanan */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs overflow-hidden"
                >
                  {/* Header Card: Order ID + Tanggal/Jam + Status Badge */}
                  <div className="px-6 py-4 border-b border-[#ede3d5] flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#2C1E1A]">
                        {order.orderNumber}
                      </h3>
                      <p className="text-xs text-[#8a7060] mt-0.5">{order.date}</p>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        order.status === "Sedang Dikirim"
                          ? "bg-[#fbf6ec] text-[#d97706] border border-[#fde68a]"
                          : order.status === "Menunggu Pembayaran"
                          ? "bg-[#fbf6ec] text-[#d97706] border border-[#fde68a]"
                          : "bg-[#fbf6ec] text-[#C5A059] border border-[#dfb96c]/40"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Body Card */}
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Info Produk */}
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#F5F2ED] shrink-0 border border-[#ede3d5]">
                        <Image
                          src={order.img}
                          alt={order.productName}
                          fill
                          className="object-cover object-top"
                        />
                        <span className="absolute top-1.5 left-1.5 text-[8px] font-bold text-white bg-[#3b2a1a] px-1.5 py-0.5 rounded uppercase">
                          {order.label}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-[#2C1E1A] mb-1">
                          {order.productName}
                        </h4>
                        <p className="text-xs text-[#8a7060] mb-2">
                          {order.size} • {order.qty} pcs
                        </p>
                        <p className="font-bold text-sm text-[#C5A059]">
                          {order.price}
                        </p>
                      </div>
                    </div>

                    {/* Right Action: Total + Action Buttons */}
                    <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#8a7060]">
                        Total <span className="text-[#2C1E1A] font-bold">{order.total}</span>
                      </p>

                      <div className="flex items-center gap-2.5">
                        {order.status === "Sedang Dikirim" && (
                          <>
                            <button
                              type="button"
                              className="px-5 py-2 rounded-full border border-[#ede3d5] bg-[#f9f5ee] hover:bg-[#ede3d5] text-xs font-semibold text-[#2C1E1A] transition-all cursor-pointer"
                            >
                              Lacak Pesanan
                            </button>
                            <button
                              type="button"
                              className="px-5 py-2 rounded-full bg-[#C5A059] hover:bg-[#b08945] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              Detail
                            </button>
                          </>
                        )}

                        {order.status === "Menunggu Pembayaran" && (
                          <>
                            <button
                              type="button"
                              className="px-5 py-2 rounded-full bg-[#C5A059] hover:bg-[#b08945] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              Bayar Sekarang
                            </button>
                            <button
                              type="button"
                              className="px-5 py-2 rounded-full bg-[#f9f5ee] hover:bg-[#ede3d5] text-xs font-semibold text-[#2C1E1A] transition-all cursor-pointer"
                            >
                              Detail
                            </button>
                          </>
                        )}

                        {order.status === "Selesai" && (
                          <>
                            <button
                              type="button"
                              className="px-5 py-2 rounded-full bg-[#f9f5ee] hover:bg-[#ede3d5] text-xs font-semibold text-[#2C1E1A] transition-all cursor-pointer"
                            >
                              Ulas Produk
                            </button>
                            <button
                              type="button"
                              className="px-5 py-2 rounded-full bg-[#f9f5ee] hover:bg-[#ede3d5] text-xs font-semibold text-[#2C1E1A] transition-all cursor-pointer"
                            >
                              Detail
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
