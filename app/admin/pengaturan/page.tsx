"use client";

import React, { useState } from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import {
  Store,
  Users,
  Plus,
  Pencil,
  Trash2,
  Key,
  Shield,
  Clock,
} from "lucide-react";

interface AdminUser {
  initials: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: "Aktif" | "Inaktif";
}

const initialAdmins: AdminUser[] = [
  {
    initials: "MR",
    name: "Muhammad Rendy",
    username: "evan.admin",
    email: "rendy@example.com",
    role: "Super Admin",
    status: "Aktif",
  },
  {
    initials: "FF",
    name: "Faishal Nur Firdaus",
    username: "faishur.firdaus",
    email: "faishal@example.com",
    role: "Editor",
    status: "Inaktif",
  },
  {
    initials: "NR",
    name: "Nizam Putra Rasya",
    username: "nizam.putra",
    email: "nizam@example.com",
    role: "Editor",
    status: "Inaktif",
  },
  {
    initials: "ES",
    name: "Evan Swardana",
    username: "ea.adinata",
    email: "evan@example.com",
    role: "Staff",
    status: "Aktif",
  },
];

const activityLogs = [
  {
    initials: "SA",
    admin: "Super Admin",
    activity: "Login",
    time: "4 Jun 2026 17:38:39",
    ip: "10.288.3.194",
  },
  {
    initials: "EA",
    admin: "Evan Adinata",
    activity: "Edit Produk",
    time: "3 Jun 2026 18:33:23",
    ip: "10.10.0.0.1",
  },
];

export default function AdminPengaturanPage() {
  const [activeTab, setActiveTab] = useState<"profil" | "admin">("admin");
  const [forcePasswordChange, setForcePasswordChange] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <PageHeaderBanner
        title="Akun Admin"
        description="Kelola daftar akun pengelola, peran (role), hak akses, dan keamanan sistem Batik Celaket"
      />

      {/* Tabs Switcher: Profil Toko vs Akun Admin */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("profil")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "profil"
              ? "bg-[#3D2817] text-white shadow"
              : "bg-[#EAE2D2] text-[#6E543C] hover:bg-[#E2D8C6]"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Profil Toko</span>
        </button>

        <button
          onClick={() => setActiveTab("admin")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "admin"
              ? "bg-[#3D2817] text-white shadow"
              : "bg-[#EAE2D2] text-[#6E543C] hover:bg-[#E2D8C6]"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Akun Admin</span>
        </button>
      </div>

      {activeTab === "admin" ? (
        <div className="space-y-7">
          {/* Section: Daftar Akun Admin */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-[#3D2817]">
                Daftar Akun Admin
              </h2>
              <button className="flex items-center gap-1.5 bg-[#3D2817] hover:bg-[#523722] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow active:scale-[0.98] transition-all">
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Admin Baru</span>
              </button>
            </div>

            {/* Table Daftar Akun Admin */}
            <div className="rounded-2xl border border-[#D9CBB7] overflow-hidden bg-[#FAF7F2] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#D9CBB7]/70 text-[#4A3525] font-semibold text-[11px] tracking-wider">
                      <th className="py-3 px-4">Foto Profil</th>
                      <th className="py-3 px-4">Nama Lengkap</th>
                      <th className="py-3 px-4">Username</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Peran</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DAC8] text-[#2C1E1A] font-medium bg-[#EFE8DA]/40">
                    {initialAdmins.map((adm, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#E8DFC8]/50 transition-colors"
                      >
                        {/* Foto Profil (Avatar Bulat Gelap) */}
                        <td className="py-3 px-4">
                          <div className="w-8 h-8 rounded-full bg-[#523722] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {adm.initials}
                          </div>
                        </td>

                        {/* Nama Lengkap */}
                        <td className="py-3 px-4 font-bold text-[#2C1E1A]">
                          {adm.name}
                        </td>

                        {/* Username */}
                        <td className="py-3 px-4 text-[#6E543C] font-mono">
                          {adm.username}
                        </td>

                        {/* Email */}
                        <td className="py-3 px-4 text-[#4A3525]">
                          {adm.email}
                        </td>

                        {/* Peran */}
                        <td className="py-3 px-4 font-semibold text-[#3D2817]">
                          {adm.role}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold ${
                              adm.status === "Aktif"
                                ? "bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]"
                                : "bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]"
                            }`}
                          >
                            {adm.status}
                          </span>
                        </td>

                        {/* Aksi (<Pencil/>, <Trash2/>, <Key/>) */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2.5 text-[#6E543C]">
                            <button
                              title="Edit Admin"
                              className="hover:text-[#3D2817] transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              title="Hapus Admin"
                              className="hover:text-[#B91C1C] transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              title="Ganti Password / Akses"
                              className="hover:text-[#C5A059] transition-colors"
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Grid Bawah: Log Aktivitas Admin (Kiri) + Pengaturan Keamanan (Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Log Aktivitas Admin (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-base font-bold text-[#3D2817]">
                Log Aktivitas Admin
              </h2>

              <div className="rounded-2xl border border-[#D9CBB7] overflow-hidden bg-[#FAF7F2] shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#D9CBB7]/70 text-[#4A3525] font-semibold text-[11px]">
                      <th className="py-2.5 px-4">Admin</th>
                      <th className="py-2.5 px-4">Aktivitas</th>
                      <th className="py-2.5 px-4">Waktu</th>
                      <th className="py-2.5 px-4">Alamat IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DAC8] text-[#2C1E1A] font-medium bg-[#EFE8DA]/40">
                    {activityLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-[#E8DFC8]/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#523722] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                              {log.initials}
                            </div>
                            <span className="font-bold text-[#2C1E1A] text-xs">
                              {log.admin}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#4A3525]">
                          {log.activity}
                        </td>
                        <td className="py-3 px-4 text-[#6E543C] font-mono text-[11px]">
                          {log.time}
                        </td>
                        <td className="py-3 px-4 text-[#6E543C] font-mono text-[11px]">
                          {log.ip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pengaturan Keamanan (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#3D2817]">
                  Pengaturan Keamanan
                </h2>
                <Key className="w-4 h-4 text-[#C5A059]" />
              </div>

              <div className="bg-[#EFE8DA] rounded-2xl p-5 border border-[#D9CBB7] space-y-5 shadow-sm">
                {/* Paksa Ganti Password */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#3D2817]">
                      Paksa Ganti Password
                    </p>
                    <p className="text-[11px] text-[#6E543C] mt-0.5">
                      Mewajibkan admin mengganti password berkala
                    </p>
                  </div>
                  {/* Tailwind Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setForcePasswordChange(!forcePasswordChange)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      forcePasswordChange ? "bg-[#3D2817]" : "bg-[#C4B7A6]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        forcePasswordChange ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Konfigurasi 2FA */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#3D2817]">
                      Konfigurasi 2FA
                    </p>
                    <p className="text-[11px] text-[#6E543C] mt-0.5">
                      Autentikasi dua faktor untuk login admin
                    </p>
                  </div>
                  {/* Tailwind Toggle Switch Active */}
                  <button
                    type="button"
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      twoFactorAuth ? "bg-[#22C55E]" : "bg-[#C4B7A6]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        twoFactorAuth ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Sesi Login Timeout */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#3D2817]">
                      Sesi Login Timeout
                    </p>
                    <p className="text-[11px] text-[#6E543C] mt-0.5">
                      Otomatis logout setelah 10 menit inaktif
                    </p>
                  </div>
                  <Clock className="w-5 h-5 text-[#6E543C] shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab Profil Toko Fallback/Overview */
        <div className="bg-[#F3ECE0] rounded-2xl p-6 border border-[#E4D8C4] space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#3D2817]">
            Informasi Toko Batik Celaket
          </h3>
          <p className="text-xs text-[#6E543C]">
            Kelola profil resmi, alamat butik, kontak customer service, dan integrasi toko Batik Celaket Malang.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-[#4A3525]">Nama Usaha</label>
              <input
                type="text"
                readOnly
                value="Batik Celaket Malang"
                className="w-full bg-[#FAF7F2] border border-[#D9CBB7] rounded-xl px-3.5 py-2 text-xs font-medium text-[#2C1E1A] mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4A3525]">Alamat Butik</label>
              <input
                type="text"
                readOnly
                value="Jl. Jaksa Agung Suprapto Gg. 1 No. 88, Celaket, Kota Malang"
                className="w-full bg-[#FAF7F2] border border-[#D9CBB7] rounded-xl px-3.5 py-2 text-xs font-medium text-[#2C1E1A] mt-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
