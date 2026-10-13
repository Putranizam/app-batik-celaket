import Image from "next/image";
import Link from "next/link";
import DesktopNavbar from "../../components/DesktopNavbar";
import {
  ArrowRight,
  Tag,
  Camera,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

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
    href: "/produk/1",
  },
  {
    id: 2,
    name: "Blouse Batik Modern Mega Mendung Gold",
    price: "Rp 450.000",
    label: "MODERN",
    labelColor: "#38281d",
    img: "/batik_modern_mega_mendung.jpg",
    href: "/produk/2",
  },
  {
    id: 3,
    name: "Outer Silk Kebaya Motif Parang Kusumo",
    price: "Rp 520.000",
    label: "SILK",
    labelColor: "#42301c",
    img: "/batik_silk_kebaya_parang.jpg",
    href: "/produk/3",
  },
  {
    id: 4,
    name: "Kemeja Casual Slimfit Kawung Gula Aren",
    price: "Rp 380.000",
    label: "CAP",
    labelColor: "#4a3010",
    img: "/batik_cap_kawung.jpg",
    href: "/produk/4",
  },
];

export default function BerandaPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans selection:bg-[#c5a059]/20">
      {/* Top Desktop Navigation */}
      <DesktopNavbar activeTab="beranda" />

      {/* Main Container */}
      <main className="flex-1 w-full pb-20">
        {/* Full-width Hero Banner with dark overlay text */}
        <section className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] overflow-hidden bg-[#2D1D18]">
          <Image
            src="/batik_hero_banner.jpg"
            alt="Koleksi Batik Terbaik dari Malang"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center">
            <div className="max-w-xl">
              <p className="text-[#C5A059] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 sm:mb-3">
                WARISAN BUDAYA MALANG
              </p>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[54px] font-bold text-white leading-[1.15] mb-3 sm:mb-4">
                Koleksi Batik Terbaik dari Malang
              </h1>
              <p className="text-white/80 text-xs sm:text-sm lg:text-base mb-5 sm:mb-7 leading-relaxed max-w-lg">
                Temukan keindahan motif batik khas Nusantara yang dipadukan dengan cita rasa modern.
              </p>
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08945] text-white text-xs sm:text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#C5A059]/40 hover:scale-105 active:scale-95 group"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8 sm:space-y-12">
          {/* Kategori Koleksi */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1E1A]">
                Kategori Koleksi
              </h2>
              <Link
                href="/produk"
                className="text-xs sm:text-sm text-[#C5A059] font-bold hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            {/* Horizontal Grid of 6 Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href="/produk"
                  className="bg-[#f5ede1] hover:bg-[#ede1d1] border border-[#e5d8c6] rounded-2xl p-3 flex items-center gap-3 transition-all hover:shadow-xs group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-[#dfd2be]">
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
                </Link>
              ))}
            </div>
          </section>

          {/* Banner Promo Diskon 20% */}
          <section>
            <div className="bg-[#f7efe3] border border-[#dfb96c]/40 rounded-2xl p-5 md:p-6 flex items-center gap-5 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#2C1E1A] flex items-center justify-center shrink-0">
                <Tag size={20} className="text-[#C5A059]" />
              </div>
              <div>
                <p className="text-[10.5px] font-bold text-[#C5A059] uppercase tracking-widest mb-1">
                  PENAWARAN SPESIAL
                </p>
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#2C1E1A]">
                  Diskon 20% untuk Pembelian Pertama
                </h3>
              </div>
            </div>
          </section>

          {/* Produk Terbaru (4 Kolom Card Desktop) */}
          <section className="relative">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="bg-white rounded-2xl border border-[#ede3d5] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col"
                >
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
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="font-semibold text-sm text-[#2C1E1A] leading-snug mb-2 line-clamp-2">
                      {p.name}
                    </p>
                    <p className="font-bold text-base text-[#C5A059]">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Kamera AI Floating Button (Kanan Bawah Emas) */}
            <div className="fixed bottom-8 right-8 z-40">
              <Link
                href="/kamera"
                id="btn-kamera-ai"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#C5A059] hover:bg-[#b08945] text-white font-bold text-sm shadow-xl hover:shadow-[#C5A059]/40 hover:scale-105 active:scale-95 transition-all group"
              >
                <Camera size={18} />
                <span>Kamera AI</span>
                <Sparkles size={14} className="text-white/80 animate-pulse" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
