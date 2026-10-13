"use client";

import Link from "next/link";
import DesktopNavbar from "../../components/DesktopNavbar";
import {
  Package,
  Truck,
  Ticket,
  MapPin,
  ClipboardList,
  Settings,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProfilPage() {
  const { user, logout, getInitials } = useAuth();

  const displayName = user?.namaLengkap || user?.username || "Pengguna";
  const displayEmail = user?.email || "pengguna@email.com";
  const displayPhone = user?.phone || "+62 812 3456 7890";
  const initials = getInitials(displayName);

  return (
    <ProtectedRoute redirectTo="/login">
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
        {/* Top Navbar dengan Akun Saya aktif */}
        <DesktopNavbar activeTab="akun" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Profil Saya</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Profil Saya
          </h1>
          <p className="text-xs sm:text-sm text-[#8a7060] mt-1 font-normal">
            Kelola akun dan kebutuhan belanjamu.
          </p>
        </div>

        {/* Layout Utama 2 Kolom (Kiri ~30% / col-span-4, Kanan ~70% / col-span-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= SIDEBAR KIRI ================= */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card Profil Putih */}
            <div className="bg-white rounded-2xl border border-[#ede3d5] p-8 shadow-xs flex flex-col items-center text-center">
              {/* Foto Profil Bulat / Avatar Inisial */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-[#ede3d5] shadow-xs bg-[#3D2817] flex items-center justify-center text-[#FAF7F2]">
                <span className="font-serif-luxury text-3xl font-bold tracking-wider select-none">
                  {initials}
                </span>
              </div>

              {/* Nama Serif Bold */}
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-1">
                {displayName}
              </h2>

              {/* Email & Telepon */}
              <p className="text-xs text-[#8a7060] mb-1 font-medium">
                {displayEmail}
              </p>
              <p className="text-xs text-[#8a7060] mb-4 font-medium">
                {displayPhone}
              </p>

              {/* Badge Kapsul: Sparkles + MEMBER SEKAR */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fbf6ec] border border-[#dfb96c]/40 text-xs font-bold text-[#C5A059] mb-5 shadow-2xs">
                <Sparkles size={12} className="text-[#C5A059]" />
                <span className="tracking-wider">MEMBER SEKAR</span>
              </div>

              {/* Tombol Lebar 'Edit' Berlatar Krem Terang */}
              <Link
                href="/pengaturan-akun"
                className="w-full py-3 rounded-full bg-[#f5ede1] hover:bg-[#ede1d1] text-[#2C1E1A] font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-xs"
              >
                Edit
              </Link>
            </div>

            {/* Tombol Kapsul Outline Merah Bata: 'Keluar dari Akun' */}
            <button
              onClick={() => logout()}
              className="w-full py-3.5 rounded-full border border-red-300 hover:bg-red-50 text-red-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <LogOut size={16} />
              <span>Keluar dari Akun</span>
            </button>

            {/* Footer Teks Kecil */}
            <div className="pt-2 text-center text-[11px] text-[#9a897e]">
              Batik Celaket â€¢ Versi 1.6.0
            </div>
          </div>

          {/* ================= KONTEN UTAMA KANAN ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bagian Aktivitas Belanja */}
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                Aktivitas Belanja
              </h2>
              {/* Grid 3 Card Putih Berdampingan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Card 1: Pesanan */}
                <Link
                  href="/pesanan"
                  className="bg-white rounded-2xl border border-[#ede3d5] p-5 shadow-xs hover:border-[#dfb96c] transition-all cursor-pointer group"
                >
                  <Package size={22} className="text-[#C5A059] mb-3" />
                  <p className="font-serif-luxury text-3xl font-bold text-[#C5A059] mb-1">
                    3
                  </p>
                  <p className="text-xs font-semibold text-[#8a7060]">Pesanan</p>
                </Link>

                {/* Card 2: Dikirim */}
                <Link
                  href="/pesanan"
                  className="bg-white rounded-2xl border border-[#ede3d5] p-5 shadow-xs hover:border-[#dfb96c] transition-all cursor-pointer group"
                >
                  <Truck size={22} className="text-[#C5A059] mb-3" />
                  <p className="font-serif-luxury text-3xl font-bold text-[#C5A059] mb-1">
                    1
                  </p>
                  <p className="text-xs font-semibold text-[#8a7060]">Dikirim</p>
                </Link>

                {/* Card 3: Voucher */}
                <div className="bg-white rounded-2xl border border-[#ede3d5] p-5 shadow-xs">
                  <Ticket size={22} className="text-[#C5A059] mb-3" />
                  <p className="font-serif-luxury text-3xl font-bold text-[#C5A059] mb-1">
                    2
                  </p>
                  <p className="text-xs font-semibold text-[#8a7060]">Voucher</p>
                </div>
              </div>
            </div>

            {/* Bagian Alamat Utama */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A]">
                  Alamat Utama
                </h2>
                <Link
                  href="/pengaturan-akun"
                  className="text-xs sm:text-sm font-bold text-[#C5A059] hover:underline"
                >
                  Kelola
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-[#ede3d5] p-6 shadow-xs divide-y divide-[#ede3d5]">
                {/* Baris Penerima & Telepon */}
                <div className="flex items-center gap-4 pb-4">
                  <div className="w-11 h-11 rounded-full bg-[#2C1E1A] flex items-center justify-center text-[#C5A059] shrink-0 shadow-xs">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#2C1E1A]">
                        {displayName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#fbf6ec] border border-[#dfb96c]/40 text-[10px] font-bold text-[#C5A059]">
                        Utama
                      </span>
                    </div>
                    <p className="text-xs text-[#8a7060] mt-0.5">{displayPhone}</p>
                  </div>
                </div>

                {/* Alamat Lengkap */}
                <div className="pt-4 text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                  Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112
                </div>
              </div>
            </div>

            {/* Grid 2 Kolom Bawah: Akun & Pembayaran (Kiri) | Bantuan (Kanan) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri: Akun & Pembayaran */}
              <div>
                <h2 className="font-serif-luxury text-xl font-bold text-[#2C1E1A] mb-4">
                  Akun &amp; Pembayaran
                </h2>
                <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs divide-y divide-[#ede3d5] overflow-hidden">
                  {/* Item: Pesanan Saya */}
                  <Link
                    href="/pesanan"
                    className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0 text-[#C5A059]">
                        <ClipboardList size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#2C1E1A]">Pesanan Saya</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">
                          3 pesanan â€¢ 1 sedang dikirim
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Item: Pengaturan Akun */}
                  <Link
                    href="/pengaturan-akun"
                    className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0 text-[#C5A059]">
                        <Settings size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#2C1E1A]">Pengaturan Akun</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">
                          Data pribadi, kata sandi, dan notifikasi
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Kolom Kanan: Bantuan */}
              <div>
                <h2 className="font-serif-luxury text-xl font-bold text-[#2C1E1A] mb-4">
                  Bantuan
                </h2>
                <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs divide-y divide-[#ede3d5] overflow-hidden">
                  {/* Item: Pusat Bantuan */}
                  <div className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0 text-[#C5A059]">
                        <HelpCircle size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#2C1E1A]">Pusat Bantuan</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">
                          Pertanyaan umum dan panduan belanja
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  {/* Item: Hubungi Kami */}
                  <Link
                    href="/tentang"
                    className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0 text-[#C5A059]">
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#2C1E1A]">Hubungi Kami</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">
                          WhatsApp â€¢ Setiap hari, 08.00â€“20.00
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </ProtectedRoute>
  );
}
