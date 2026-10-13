"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DesktopNavbar from "../../components/DesktopNavbar";
import { Trash2, Minus, Plus, Check } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  label: string;
  size: string;
  price: number;
  qty: number;
  img: string;
  checked: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Blouse Batik Modern Mega Mendung Gold",
    label: "MODERN",
    size: "Ukuran L",
    price: 450000,
    qty: 1,
    img: "/batik_modern_mega_mendung.jpg",
    checked: true,
  },
  {
    id: 2,
    name: "Blouse Batik Modern Mega Mendung Gold",
    label: "MODERN",
    size: "Ukuran L",
    price: 450000,
    qty: 1,
    img: "/batik_modern_mega_mendung.jpg",
    checked: true,
  },
];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function KeranjangPage() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [allChecked, setAllChecked] = useState(true);

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    setItems((prev) => prev.map((it) => ({ ...it, checked: next })));
  };


  const changeQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const checkedItems = items.filter((it) => it.checked);
  const totalSubtotal = checkedItems.reduce((s, it) => s + it.price * it.qty, 0);
  const totalQty = checkedItems.reduce((s, it) => s + it.qty, 0);
  const ongkir = checkedItems.length > 0 ? 20000 : 0;
  const grandTotal = totalSubtotal + ongkir;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
      {/* Top Navbar */}
      <DesktopNavbar activeTab="keranjang" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Keranjang</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Keranjang
          </h1>
        </div>

        {/* 2-Column Grid (Kiri: Daftar Produk, Kanan: Ringkasan Belanja) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= KOLOM KIRI ================= */}
          <div className="lg:col-span-8 space-y-4">
            {/* Card Melintang: Pilih Semua + Total Harga */}
            <div className="bg-white rounded-2xl border border-[#ede3d5] p-5 shadow-xs flex items-center justify-between">
              <button
                type="button"
                onClick={toggleAll}
                className="flex items-center gap-3.5 cursor-pointer group"
              >
                {/* Checkbox Emas */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    allChecked
                      ? "bg-[#C5A059] border-[#C5A059] text-white shadow-xs"
                      : "border-2 border-[#d0c4b6] group-hover:border-[#C5A059]"
                  }`}
                >
                  {allChecked && <Check size={14} strokeWidth={3} />}
                </div>
                <span className="font-bold text-sm text-[#2C1E1A]">Pilih Semua</span>
              </button>

              <span className="font-bold text-base text-[#2C1E1A]">
                {formatRupiah(totalSubtotal)}
              </span>
            </div>

            {/* List Card Produk */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#ede3d5] p-6 shadow-xs flex items-center justify-between gap-5"
                >
                  {/* Left part: Image + Details */}
                  <div className="flex items-center gap-5 min-w-0">
                    {/* Gambar Produk dengan latar abu-abu terang */}
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#F5F2ED] shrink-0 border border-[#f0e7db]">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Deskripsi Produk */}
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#C5A059] tracking-wider uppercase block mb-1">
                        {item.label}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-[#2C1E1A] leading-snug mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#8a7060] mb-2">{item.size}</p>
                      <p className="font-bold text-base text-[#C5A059]">
                        {formatRupiah(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Right part: Qty Control Kapsul + Trash Icon */}
                  <div className="flex items-center gap-4 shrink-0">
                    {/* Komponen pengatur jumlah berbingkai kapsul */}
                    <div className="flex items-center h-10 px-2 rounded-full border border-[#ede3d5] bg-white gap-2 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => changeQty(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#2C1E1A] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
                        aria-label="Kurangi"
                      >
                        <Minus size={13} strokeWidth={2.5} />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#2C1E1A]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQty(item.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#2C1E1A] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
                        aria-label="Tambah"
                      >
                        <Plus size={13} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Ikon tempat sampah (delete) */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#2C1E1A] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label="Hapus item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= KOLOM KANAN: RINGKASAN BELANJA ================= */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-[#ede3d5] p-6 shadow-xs sticky top-28 space-y-5">
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A]">
                Ringkasan Belanja
              </h2>

              <hr className="border-[#ede3d5]" />

              {/* Rincian Harga */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-[#5a483e]">
                  <span>Total harga ({totalQty} item)</span>
                  <span className="text-[#2C1E1A] font-medium">{formatRupiah(totalSubtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[#5a483e]">
                  <span>Ongkos Kirim</span>
                  <span className="text-[#2C1E1A] font-medium">{formatRupiah(ongkir)}</span>
                </div>
              </div>

              <hr className="border-[#ede3d5]" />

              {/* Total Pembayaran */}
              <div className="flex justify-between items-center pt-1">
                <span className="font-serif-luxury text-lg font-bold text-[#2C1E1A]">
                  Total Pembayaran
                </span>
                <span className="font-bold text-xl text-[#C5A059]">
                  {formatRupiah(grandTotal)}
                </span>
              </div>

              {/* Tombol Checkout Lebar Penuh (w-full) Emas Mustard Gelap */}
              <Link
                href="/checkout"
                className="w-full h-12 rounded-full bg-[#C79A3B] hover:bg-[#b58b32] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center shadow-md transition-all cursor-pointer text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
