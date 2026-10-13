"use client";

import Image from "next/image";
import Link from "next/link";
import DesktopNavbar from "../../components/DesktopNavbar";
import { SlidersHorizontal, Camera, Sparkles } from "lucide-react";

const categories = [
  { name: "Sekar Jagad", img: "/batik_tulis_sekar_jagad.jpg" },
  { name: "Mega Mendung", img: "/batik_category_mega_mendung.jpg" },
  { name: "Parang", img: "/batik_silk_kebaya_parang.jpg" },
  { name: "Kawung", img: "/batik_cap_kawung.jpg" },
  { name: "Truntum", img: "/batik_category_mega_mendung.jpg" },
  { name: "Jlamprang", img: "/batik_tulis_sekar_jagad.jpg" },
];

const products = [
  {
    id: 1,
    name: "Kemeja Batik Tulis Sekar Jagad Malang",
    price: "Rp 680.000",
    label: "TULIS",
    labelColor: "#3b2a1a",
    img: "/batik_tulis_sekar_jagad.jpg",
  },
  {
    id: 2,
    name: "Blouse Batik Modern Mega Mendung Gold",
    price: "Rp 450.000",
    label: "MODERN",
    labelColor: "#38281d",
    img: "/batik_modern_mega_mendung.jpg",
  },
  {
    id: 3,
    name: "Outer Silk Kebaya Motif Parang Kusumo",
    price: "Rp 520.000",
    label: "SILK",
    labelColor: "#42301c",
    img: "/batik_silk_kebaya_parang.jpg",
  },
  {
    id: 4,
    name: "Kemeja Casual Slimfit Kawung Gula Aren",
    price: "Rp 380.000",
    label: "CAP",
    labelColor: "#4a3010",
    img: "/batik_cap_kawung.jpg",
  },
];

export default function ProdukCatalogPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
      {/* Top Navbar dengan Produk aktif */}
      <DesktopNavbar activeTab="produk" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* ================= BAGIAN KATEGORI KOLEKSI (ATAS) ================= */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1E1A]">
              Kategori Koleksi
            </h1>
            <Link
              href="/produk"
              className="text-xs sm:text-sm text-[#C5A059] font-bold hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          {/* List Horizontal Kapsul Memanjang Putih dengan lingkaran tekstur batik */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-[#f5ede1] hover:bg-[#ede1d1] border border-[#e5d8c6] rounded-2xl p-2.5 flex items-center gap-3 transition-all cursor-pointer group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0 border border-[#dfd2be]">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#2C1E1A] line-clamp-1">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BANNER PROMO (TENGAH) ================= */}
        <section>
          <div className="bg-[#f7efe3] border border-[#dfb96c]/40 rounded-2xl p-5 md:p-6 flex items-center gap-5 shadow-xs">
            {/* Ikon belah ketupat dalam kotak cokelat */}
            <div className="w-12 h-12 rounded-xl bg-[#2C1E1A] flex items-center justify-center shrink-0 shadow-xs">
              <div className="w-5 h-5 border-2 border-[#C5A059] rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#C5A059]" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-1">
                PENAWARAN SPESIAL
              </p>
              <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#2C1E1A]">
                Diskon 20% untuk Pembelian Pertama
              </h2>
            </div>
          </div>
        </section>

        {/* ================= GRID PRODUK (BAWAH) ================= */}
        <section className="relative pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1E1A]">
              Produk Terbaru
            </h2>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ede3d5] bg-white hover:bg-[#f4efe6] text-xs font-semibold text-[#2C1E1A] transition-all shadow-xs cursor-pointer"
            >
              <SlidersHorizontal size={14} className="text-[#8a7060]" />
              <span>Filter</span>
            </button>
          </div>

          {/* Grid 4 Kolom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/produk/${p.id}`}
                className="bg-white rounded-2xl border border-[#ede3d5] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col"
              >
                {/* Gambar rasio vertikal portrait dengan sudut membulat & badge cokelat gelap */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#ece2d3]">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className="absolute top-3 left-3 text-[9px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-wider"
                    style={{ backgroundColor: p.labelColor }}
                  >
                    {p.label}
                  </span>
                </div>

                {/* Info Produk */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-sm text-[#2C1E1A] leading-snug mb-2 line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="font-bold text-base text-[#C5A059]">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Floating Action Button: Kamera AI (Fixed di kanan bawah) */}
          <div className="fixed bottom-8 right-8 z-40">
            <Link
              href="/kamera"
              id="btn-kamera-ai-fab"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#C5A059] hover:bg-[#b08945] active:scale-95 text-white font-bold text-sm shadow-xl hover:shadow-[#C5A059]/40 transition-all group"
            >
              <Camera size={18} />
              <span>Kamera AI</span>
              <Sparkles size={14} className="text-white/80 animate-pulse" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
