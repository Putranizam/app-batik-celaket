"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DesktopNavbar from "../../../components/DesktopNavbar";
import { MessageCircle, ShoppingBag } from "lucide-react";

const colorVariants = [
  { img: "/batik_tulis_sekar_jagad.jpg", label: "Cokelat Emas" },
  { img: "/batik_category_mega_mendung.jpg", label: "Cokelat Klasik" },
  { img: "/batik_silk_kebaya_parang.jpg", label: "Kuning Kunyit" },
  { img: "/batik_cap_kawung.jpg", label: "Sogan Tradisional" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const sizeTable = [
  { size: "S", chest: "48 cm", length: "68 cm" },
  { size: "M", chest: "50 cm", length: "70 cm" },
  { size: "L", chest: "52 cm", length: "72 cm" },
  { size: "XL", chest: "54 cm", length: "74 cm" },
  { size: "XXL", chest: "56 cm", length: "76 cm" },
];

export default function ProdukDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans selection:bg-[#c5a059]/20">
      {/* Top Desktop Navigation */}
      <DesktopNavbar activeTab="produk" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#8a7060] mb-6 sm:mb-8 flex items-center gap-1.5 font-medium overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/produk" className="hover:text-[#2C1E1A] transition-colors">
            Produk
          </Link>
          <span>/</span>
          <span className="text-[#2C1E1A] truncate max-w-[200px] sm:max-w-none">Kemeja Batik Tulis Sekar Jagad Malang</span>
        </nav>

        {/* ========================================================
            STRUKTUR ATAS: GRID 2 KOLOM (KIRI GALERI, KANAN AKSI)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* KIRI (Galeri) - 6 atau 7 cols */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Gambar Produk Besar rounded-2xl */}
            <div className="relative w-full aspect-[4/5] max-h-[580px] rounded-2xl overflow-hidden bg-[#ece2d3] border border-[#ede3d5] shadow-xs">
              <Image
                src="/batik_tulis_sekar_jagad.jpg"
                alt="Kemeja Batik Tulis Sekar Jagad Malang"
                fill
                priority
                className="object-cover object-center"
              />
              {/* Badge Cokelat 'TULIS' */}
              <span className="absolute top-5 left-5 text-[11px] font-bold tracking-widest text-white bg-[#3b2a1a]/90 backdrop-blur-xs px-3 py-1 rounded-md shadow-sm uppercase">
                TULIS
              </span>
            </div>

            {/* Slider Dots (4 titik dot, titik aktif berwarna abu gelap) */}
            <div className="flex items-center gap-2 mt-4">
              {[0, 1, 2, 3].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setCurrentSlide(dot)}
                  aria-label={`Slide ${dot + 1}`}
                  className={`rounded-full transition-all duration-200 cursor-pointer ${
                    currentSlide === dot
                      ? "w-2.5 h-2.5 bg-[#2C1E1A]"
                      : "w-2 h-2 bg-[#d7cbbe] hover:bg-[#b8a796]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* KANAN (Aksi & Varian) - 6 cols */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-2">
            {/* Judul Produk Font Serif Besar */}
            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#2C1E1A] leading-[1.2] mb-4">
              Kemeja Batik Tulis Sekar Jagad Malang
            </h1>

            {/* Harga Emas (#C79A54) */}
            <p className="text-2xl sm:text-3xl font-bold text-[#C79A54] mb-8">
              Rp 680.000
            </p>

            {/* Label Warna */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#2C1E1A] mb-3">Warna</p>
              <div className="flex items-center gap-3">
                {colorVariants.map((variant, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(idx)}
                    className={`relative w-14 h-14 rounded-full overflow-hidden transition-all cursor-pointer p-0.5 ${
                      selectedColor === idx
                        ? "ring-2 ring-[#2C1E1A] ring-offset-2 ring-offset-[#faf7f2] scale-105"
                        : "opacity-85 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image
                        src={variant.img}
                        alt={variant.label}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute inset-0 bg-black/15 flex items-center justify-center text-[7px] text-white font-bold uppercase">
                        TULIS
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Label Ukuran */}
            <div className="mb-10">
              <p className="text-sm font-bold text-[#2C1E1A] mb-3">Ukuran</p>
              <div className="flex items-center gap-3 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[54px] h-12 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === s
                        ? "bg-[#2C1E1A] text-white shadow-sm"
                        : "bg-[#f5efe6] text-[#2C1E1A] hover:bg-[#ebe1d3] border border-[#ede3d5]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Baris Tombol Aksi: Chat Bulat, Keranjang Kapsul Putih, Checkout Kapsul Emas Penuh */}
            <div className="flex items-center gap-3.5 pt-2">
              {/* Tombol ikon pesan/chat bulat */}
              <button
                type="button"
                aria-label="Chat Penjual"
                className="w-13 h-13 rounded-full bg-white border border-[#2C1E1A] hover:bg-[#f4efe6] active:scale-95 flex items-center justify-center text-[#2C1E1A] transition-all cursor-pointer shrink-0 shadow-xs"
              >
                <MessageCircle size={20} />
              </button>

              {/* Tombol kapsul putih dengan outline hitam bertuliskan 'Keranjang' */}
              <Link
                href="/keranjang"
                className="h-13 px-7 rounded-full bg-white border border-[#2C1E1A] hover:bg-[#f4efe6] active:scale-95 text-[#2C1E1A] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <ShoppingBag size={17} />
                <span>Keranjang</span>
              </Link>

              {/* Tombol kapsul emas penuh bertuliskan 'Checkout' yang lebih lebar */}
              <Link
                href="/checkout"
                className="flex-1 h-13 px-8 rounded-full bg-[#C79A54] hover:bg-[#b88c47] active:scale-95 text-white font-bold text-sm flex items-center justify-center shadow-md transition-all cursor-pointer text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            STRUKTUR BAWAH: GRID 2 KOLOM (KIRI DESKRIPSI, KANAN UKURAN)
            ======================================================== */}
        <div className="border-t border-[#ede3d5] pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* KIRI (Deskripsi) */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A]">
              Deskripsi
            </h2>
            <h3 className="font-semibold text-sm text-[#2C1E1A]">
              Kemeja Batik Tulis Sekar Jagad Malang
            </h3>
            <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
              Tampil elegan dengan kemeja batik tulis khas Malang dengan motif Sekar Jagad. Dibuat dengan sentuhan tradisional yang cocok digunakan untuk acara formal maupun nonformal, serta nyaman digunakan untuk aktivitas sehari-hari.
            </p>

            <div className="pt-2">
              <p className="font-semibold text-xs sm:text-sm text-[#2C1E1A] mb-2">
                Detail Produk:
              </p>
              <ul className="text-xs sm:text-sm text-[#5a483e] space-y-1 list-disc list-inside leading-relaxed">
                <li>Batik tulis khas Malang</li>
                <li>Motif Sekar Jagad</li>
                <li>Desain klasik dan elegan</li>
                <li>Cocok untuk acara formal maupun nonformal</li>
                <li>Nyaman digunakan sehari-hari</li>
              </ul>
            </div>

            <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed pt-2">
              Pesan sekarang dan tampilkan kesan elegan dengan batik tulis khas Malang.
            </p>

            {/* Kontak & Alamat Toko */}
            <div className="pt-4 text-[11px] sm:text-xs text-[#8a7060] space-y-1">
              <p>Alamat: Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112</p>
              <p>Telepon / WA: (0341) 368606 / +62 813-3458-5892</p>
              <p>Email: support@batikcelaket.com</p>
              <p>Lokasi di Google Maps:</p>
            </div>
          </div>

          {/* KANAN (Informasi Ukuran) */}
          <div className="lg:col-span-6">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
              Informasi Ukuran
            </h2>

            {/* Tabel ber-border tipis dan rounded-xl */}
            <div className="bg-white rounded-xl border border-[#ede3d5] overflow-hidden shadow-xs">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead>
                  <tr className="border-b border-[#ede3d5] text-[#2C1E1A] font-semibold bg-[#faf7f2]/50">
                    <th className="py-3 px-6">Ukuran</th>
                    <th className="py-3 px-6">Lebar Dada</th>
                    <th className="py-3 px-6">Panjang Baju</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ede3d5] text-[#5a483e]">
                  {sizeTable.map((row) => (
                    <tr key={row.size} className="hover:bg-[#faf7f2]/40 transition-colors">
                      <td className="py-3 px-6 font-medium text-[#2C1E1A]">{row.size}</td>
                      <td className="py-3 px-6">{row.chest}</td>
                      <td className="py-3 px-6">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Teks Catatan */}
            <div className="mt-4 text-xs text-[#8a7060] leading-relaxed">
              <p className="font-semibold text-[#2C1E1A] mb-1">Catatan:</p>
              <p>
                Ukuran diukur secara manual sehingga terdapat kemungkinan selisih 1-2 cm. Disarankan membandingkan ukuran dengan kemeja yang biasa digunakan sebelum melakukan pemesanan.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
