"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DesktopNavbar from "../components/DesktopNavbar";
import {
  User,
  Mail,
  Key,
  Shield,
  Sparkles,
  BarChart2,
  Trash2,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function PengaturanAkunPage() {
  const { user, getInitials } = useAuth();
  const [keamananAkun, setKeamananAkun] = useState(true);
  const [personalisasiBelanja, setPersonalisasiBelanja] = useState(true);
  const [analitikPenggunaan, setAnalitikPenggunaan] = useState(false);

  const displayName = user?.namaLengkap || user?.username || "Pengguna";
  const displayEmail = user?.email || "pengguna@email.com";
  const displayPhone = user?.phone || "+62 812 3456 7890";
  const initials = getInitials(displayName);

  return (
    <ProtectedRoute redirectTo="/login">
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
        {/* Top Desktop Navigation dengan Akun Saya aktif */}
        <DesktopNavbar activeTab="akun" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Judul Halaman */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Pengaturan Akun</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Pengaturan Akun
          </h1>
          <p className="text-xs sm:text-sm text-[#8a7060] mt-1 font-normal">
            Kelola data, keamanan, dan privasimu.
          </p>
        </div>

        {/* Layout Grid 2 Kolom: Sidebar kiri (~30%) & Konten utama kanan (~70%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= SIDEBAR KIRI (30% -> col-span-4) ================= */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card Profil Putih */}
            <div className="bg-white rounded-2xl border border-[#ede3d5] p-8 shadow-xs flex flex-col items-center text-center">
              {/* Foto Profil Bulat / Avatar Inisial */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#ede3d5] shadow-xs bg-[#3D2817] flex items-center justify-center text-[#FAF7F2]">
                <span className="font-serif-luxury text-2xl font-bold tracking-wider select-none">
                  {initials}
                </span>
              </div>

              {/* Nama Serif Tebal */}
              <h2 className="font-serif-luxury text-xl font-bold text-[#2C1E1A] mb-1">
                {displayName}
              </h2>

              {/* Teks Email */}
              <p className="text-xs text-[#8a7060] mb-4 font-medium">
                {displayEmail}
              </p>

              {/* Badge Kapsul: AKUN TERVERIFIKASI dengan teks emas */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fbf6ec] border border-[#dfb96c]/40 shadow-2xs">
                <CheckCircle2 size={13} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold tracking-wider text-[#C5A059] uppercase">
                  AKUN TERVERIFIKASI
                </span>
              </div>
            </div>

            {/* Menu Navigasi Samping: Tombol 'Profil Saya' Aktif */}
            <Link
              href="/profil"
              className="bg-[#f5ede1] hover:bg-[#ede1d1] rounded-2xl border border-[#e2d5c2] p-4 flex items-center gap-3 text-[#2C1E1A] font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
            >
              <ArrowLeft size={16} className="text-[#2C1E1A]" />
              <span>Profil Saya</span>
            </Link>

            {/* Teks Versi di paling bawah sidebar */}
            <div className="pt-2 text-center text-[11px] text-[#9a897e]">
              Batik Celaket • Versi 1.6.0
            </div>
          </div>

          {/* ================= KONTEN UTAMA KANAN (70% -> col-span-8) ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bagian Informasi Akun */}
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                Informasi Akun
              </h2>
              <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs divide-y divide-[#ede3d5] overflow-hidden">
                {/* Baris Ubah Nama */}
                <div className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0">
                      <User size={16} className="text-[#C5A059]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#2C1E1A]">Ubah Nama</p>
                      <p className="text-xs text-[#8a7060] mt-0.5">{displayName}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Baris Ubah Data Kontak */}
                <div className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-[#C5A059]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#2C1E1A]">Ubah Data Kontak</p>
                      <p className="text-xs text-[#8a7060] mt-0.5">
                        {displayEmail} • {displayPhone}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Grid 2 Kolom (Keamanan & Preferensi Privasi) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri: Keamanan */}
              <div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                  Keamanan
                </h2>
                <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs divide-y divide-[#ede3d5] overflow-hidden">
                  {/* Ubah Kata Sandi */}
                  <div className="p-5 flex items-center justify-between hover:bg-[#faf7f2]/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0">
                        <Key size={16} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">Ubah Kata Sandi</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">Terakhir diubah 2 bulan lalu</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#8a7060] group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  {/* Keamanan Akun (Toggle) */}
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0">
                        <Shield size={16} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">Keamanan Akun</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">Verifikasi dua langkah aktif</p>
                      </div>
                    </div>
                    {/* Toggle Switch Emas */}
                    <button
                      type="button"
                      onClick={() => setKeamananAkun(!keamananAkun)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                        keamananAkun ? "bg-[#C5A059]" : "bg-[#d8cec2]"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          keamananAkun ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Preferensi Privasi */}
              <div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] mb-4">
                  Preferensi Privasi
                </h2>
                <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs divide-y divide-[#ede3d5] overflow-hidden">
                  {/* Personalisasi Belanja (Toggle Aktif) */}
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">Personalisasi Belanja</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">
                          Gunakan aktivitas untuk rekomendasi batik
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPersonalisasiBelanja(!personalisasiBelanja)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                        personalisasiBelanja ? "bg-[#C5A059]" : "bg-[#d8cec2]"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          personalisasiBelanja ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Analitik Penggunaan (Toggle Nonaktif) */}
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fbf6ec] border border-[#e8ddce] flex items-center justify-center shrink-0">
                        <BarChart2 size={16} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">Analitik Penggunaan</p>
                        <p className="text-[11px] text-[#8a7060] mt-0.5">
                          Bantu kami meningkatkan pengalaman aplikasi
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAnalitikPenggunaan(!analitikPenggunaan)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                        analitikPenggunaan ? "bg-[#C5A059]" : "bg-[#d8cec2]"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          analitikPenggunaan ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Hapus Akun (Bawah): Card memanjang border merah bata */}
            <div className="bg-white/60 rounded-2xl border border-red-300 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <Trash2 size={18} className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-red-600">Hapus Akun</h3>
                  <p className="text-xs text-[#8a7060] mt-0.5">
                    Data dan riwayat belanja akan dihapus permanen.
                  </p>
                </div>
              </div>

              {/* Tombol outline merah */}
              <button
                type="button"
                className="px-5 py-2.5 rounded-full border border-red-500 hover:bg-red-50 text-red-600 font-bold text-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
              >
                Hapus Akun Saya
              </button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </ProtectedRoute>
  );
}
