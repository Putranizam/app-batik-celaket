"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DesktopNavbar from "../components/DesktopNavbar";
import { User, MapPin, CreditCard, Landmark, Check, ArrowRight } from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "Kemeja Batik Tulis Sekar Jagad",
    label: "TULIS",
    labelColor: "#3b2a1a",
    size: "L",
    qty: 1,
    price: 680000,
    img: "/batik_tulis_sekar_jagad.jpg",
  },
  {
    id: 2,
    name: "Blouse Batik Modern Mega Mendung",
    label: "MODERN",
    labelColor: "#38281d",
    size: "M",
    qty: 1,
    price: 450000,
    img: "/batik_modern_mega_mendung.jpg",
  },
];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");

  const subtotal = orderItems.reduce((s, it) => s + it.price * it.qty, 0);
  const ongkir = 20000;
  const diskon = 50000;
  const total = subtotal + ongkir - diskon;

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans selection:bg-[#c5a059]/20">
      {/* Top Desktop Navigation */}
      <DesktopNavbar activeTab="keranjang" />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Checkout</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Checkout
          </h1>
        </div>

        {/* 2-Column Desktop Grid Layout (col-span-8 & col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ================= LEFT COLUMN (col-span-8) ================= */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Ringkasan Pesanan Card */}
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2C1E1A] mb-3 sm:mb-4">
                Ringkasan Pesanan
              </h2>
              <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs overflow-hidden">
                <div className="divide-y divide-[#ede3d5]">
                  {orderItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 flex items-center gap-4 sm:gap-5">
                      {/* Product Thumbnail with Badge */}
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#ece2d3] shrink-0 border border-[#f0e7db]">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                        />
                        <span
                          className="absolute top-1.5 left-1.5 text-[8px] font-bold tracking-wider text-white px-1.5 py-0.5 rounded shadow-xs uppercase"
                          style={{ backgroundColor: item.labelColor }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif-luxury text-base font-bold text-[#2C1E1A] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#8a7060] mb-2 font-medium">
                          Ukuran {item.size} • {item.qty} pcs
                        </p>
                        <p className="text-base font-bold text-[#c5a059]">
                          {formatRupiah(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Pengiriman Card */}
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                Data Pengiriman
              </h2>
              <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs p-6 divide-y divide-[#ede3d5]">
                {/* User Row */}
                <div className="flex items-center gap-4 pb-4">
                  <div className="w-11 h-11 rounded-full bg-[#f6efe6] flex items-center justify-center shrink-0 border border-[#ede3d5]">
                    <User size={18} className="text-[#6c584c]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2C1E1A] text-sm">Ayu Lestari</p>
                    <p className="text-xs text-[#8a7060] mt-0.5">+62 812 3456 7890</p>
                  </div>
                </div>

                {/* Address Row */}
                <div className="flex items-start gap-4 pt-4">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#c5a059]">
                    <MapPin size={18} />
                  </div>
                  <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                    Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (col-span-4) ================= */}
          <div className="lg:col-span-4 space-y-8">
            {/* Metode Pembayaran Card */}
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                Metode Pembayaran
              </h2>
              <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs p-5 space-y-3">
                {/* Opsi 1: Kartu Kredit / Debit (Aktif) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "bg-[#f5ede1] border border-[#e2d4c0]"
                      : "bg-[#f9f6f1] border border-transparent hover:bg-[#f3ece0]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-white/80 border border-[#e2d4c0] flex items-center justify-center shrink-0">
                      <CreditCard size={18} className="text-[#c5a059]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#2C1E1A]">Kartu Kredit / Debit</p>
                      <p className="text-[11px] text-[#8a7060] mt-0.5">Visa, Mastercard, GPN</p>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <Check size={18} className="text-[#2C1E1A] stroke-[2.5]" />
                  )}
                </button>

                {/* Opsi 2: Transfer Bank */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("transfer")}
                  className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "transfer"
                      ? "bg-[#f5ede1] border border-[#e2d4c0]"
                      : "bg-[#f9f6f1] border border-transparent hover:bg-[#f3ece0]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-white/80 border border-[#e2d4c0] flex items-center justify-center shrink-0">
                      <Landmark size={18} className="text-[#8a7060]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#2C1E1A]">Transfer Bank</p>
                      <p className="text-[11px] text-[#8a7060] mt-0.5">BCA, Mandiri, BNI</p>
                    </div>
                  </div>
                  {paymentMethod === "transfer" && (
                    <Check size={18} className="text-[#2C1E1A] stroke-[2.5]" />
                  )}
                </button>
              </div>
            </div>

            {/* Ringkasan Pembayaran Card */}
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                Ringkasan Pembayaran
              </h2>
              <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs p-6 space-y-4">
                {/* Subtotal, Ongkir, Diskon */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-[#5a483e]">
                    <span>Subtotal ({orderItems.length} item)</span>
                    <span className="font-medium text-[#2C1E1A]">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#5a483e]">
                    <span>Ongkos Kirim</span>
                    <span className="font-medium text-[#2C1E1A]">{formatRupiah(ongkir)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#5a483e]">
                    <span>Diskon Member</span>
                    <span className="font-medium text-[#c04332]">-{formatRupiah(diskon)}</span>
                  </div>
                </div>

                <div className="border-t border-[#ede3d5] pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif-luxury text-base font-bold text-[#2C1E1A]">
                      Total Pembayaran
                    </span>
                    <span className="font-bold text-lg text-[#c5a059]">
                      {formatRupiah(total)}
                    </span>
                  </div>

                  {/* Nominal Total Ulangi (Serif, sangat besar) */}
                  <div className="mb-4">
                    <p className="text-[11px] text-[#8a7060] uppercase tracking-wider mb-1 font-medium">
                      Total
                    </p>
                    <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C1E1A]">
                      {formatRupiah(total)}
                    </p>
                  </div>

                  {/* Tombol Lebar Penuh (w-full) Emas */}
                  <button
                    type="button"
                    id="btn-bayar-sekarang"
                    className="w-full bg-[#c5a059] hover:bg-[#b58f4a] active:scale-[0.99] text-white font-bold text-sm py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer group"
                  >
                    <span>Bayar Sekarang</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
