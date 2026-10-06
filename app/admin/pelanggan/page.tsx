"use client";

import React, { useState } from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import {
  Search,
  ChevronDown,
  Download,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Customer {
  initials: string;
  name: string;
  registeredDate: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: string;
  type: "VIP" | "REGULER" | "BARU";
}

const initialCustomers: Customer[] = [
  {
    initials: "MR",
    name: "Muhammad Rendy",
    registeredDate: "10 Jan 2026",
    email: "rendy@example.com",
    phone: "+62 812-3456-7890",
    location: "Malang",
    orders: 8,
    totalSpent: "Rp 2.850.000",
    type: "VIP",
  },
  {
    initials: "FN",
    name: "Faishal Nur Firdaus",
    registeredDate: "15 Feb 2026",
    email: "faishal@example.com",
    phone: "+62 813-9876-5432",
    location: "Surabaya",
    orders: 5,
    totalSpent: "Rp 1.680.000",
    type: "REGULER",
  },
  {
    initials: "NP",
    name: "Nizam Putra Rasya",
    registeredDate: "02 Mar 2026",
    email: "nizam@example.com",
    phone: "+62 857-1122-3344",
    location: "Jakarta",
    orders: 3,
    totalSpent: "Rp 940.000",
    type: "REGULER",
  },
  {
    initials: "ES",
    name: "Evan Swardana",
    registeredDate: "18 Apr 2026",
    email: "evan@example.com",
    phone: "+62 821-4455-6677",
    location: "Bandung",
    orders: 12,
    totalSpent: "Rp 4.120.000",
    type: "VIP",
  },
  {
    initials: "SA",
    name: "Diego Armando",
    registeredDate: "24 Jun 2026",
    email: "diego@example.com",
    phone: "+62 818-7788-9900",
    location: "Semarang",
    orders: 1,
    totalSpent: "Rp 310.000",
    type: "BARU",
  },
];

export default function AdminPelangganPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedCity, setSelectedCity] = useState("Semua Kota");
  const [currentPage, setCurrentPage] = useState(1);

  // Type badge styling
  const getTypeBadge = (type: Customer["type"]) => {
    switch (type) {
      case "VIP":
        return "border border-[#F59E0B] text-[#D97706] bg-[#FFFBEB]";
      case "REGULER":
        return "border border-[#38BDF8] text-[#0284C7] bg-[#F0F9FF]";
      case "BARU":
        return "border border-[#34D399] text-[#059669] bg-[#ECFDF5]";
      default:
        return "border border-gray-300 text-gray-700 bg-gray-50";
    }
  };

  const filteredCustomers = initialCustomers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchType =
      selectedType === "Semua" ? true : c.type === selectedType.toUpperCase();
    const matchCity =
      selectedCity === "Semua Kota" ? true : c.location === selectedCity;
    return matchSearch && matchType && matchCity;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <PageHeaderBanner
        title="Data Pelanggan"
        description="Kelola basis data pembeli, riwayat pesanan, dan profil pelanggan Batik Celaket"
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pelanggan */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#6E543C] uppercase">
            TOTAL PELANGGAN
          </p>
          <p className="text-2xl font-bold text-[#3D2817] mt-1.5">
            842 Orang
          </p>
        </div>

        {/* Baru Bulan Ini - Light Green */}
        <div className="bg-[#EAF7EE] rounded-2xl p-5 border border-[#C5E9CD] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#166534] uppercase">
            BARU BULAN INI
          </p>
          <p className="text-2xl font-bold text-[#15803D] mt-1.5">
            +45 Orang
          </p>
        </div>

        {/* Pelanggan VIP - Light Yellow */}
        <div className="bg-[#FEF9E7] rounded-2xl p-5 border border-[#FDE68A] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#B45309] uppercase">
            PELANGGAN VIP
          </p>
          <p className="text-2xl font-bold text-[#D97706] mt-1.5">
            68 Orang
          </p>
        </div>

        {/* Rata-Rata Belanja */}
        <div className="bg-[#F3ECE0] rounded-2xl p-5 border border-[#E4D8C4] flex flex-col justify-between">
          <p className="text-[11px] font-bold tracking-wider text-[#6E543C] uppercase">
            RATA-RATA BELANJA
          </p>
          <p className="text-2xl font-bold text-[#3D2817] mt-1.5">
            Rp 650.000
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C735E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, email, atau no. HP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#D9CBB7] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#2C1E1A] placeholder-[#9C826B] focus:outline-none focus:border-[#523722] focus:ring-1 focus:ring-[#523722]"
          />
        </div>

        {/* Dropdowns & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tipe Dropdown */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#D9CBB7] rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-semibold text-[#3D2817] focus:outline-none focus:border-[#523722] cursor-pointer"
            >
              <option value="Semua">Tipe: Semua</option>
              <option value="VIP">Tipe: VIP</option>
              <option value="Reguler">Tipe: Reguler</option>
              <option value="Baru">Tipe: Baru</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6E543C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Kota Dropdown */}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none bg-[#FAF7F2] border border-[#D9CBB7] rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-semibold text-[#3D2817] focus:outline-none focus:border-[#523722] cursor-pointer"
            >
              <option value="Semua Kota">Kota: Semua Kota</option>
              <option value="Malang">Malang</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Semarang">Semarang</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6E543C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Tombol Export Data */}
          <button className="flex items-center gap-2 bg-[#3D2817] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow hover:bg-[#523722] active:scale-[0.98] transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Tabel Data Pelanggan */}
      <div className="rounded-2xl border border-[#D9CBB7] overflow-hidden bg-[#FAF7F2] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#3D2817] text-[#FAF7F2] font-semibold text-[11px] tracking-wider uppercase">
                <th className="py-3.5 px-4 font-bold">PELANGGAN</th>
                <th className="py-3.5 px-4 font-bold">KONTAK</th>
                <th className="py-3.5 px-4 font-bold">LOKASI</th>
                <th className="py-3.5 px-4 font-bold">PESANAN</th>
                <th className="py-3.5 px-4 font-bold">TOTAL BELANJA</th>
                <th className="py-3.5 px-4 font-bold text-center">TIPE</th>
                <th className="py-3.5 px-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFCB] text-[#2C1E1A] font-medium bg-[#EFE8DA]">
              {filteredCustomers.map((cust, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#E8DFC8]/60 transition-colors"
                >
                  {/* Pelanggan (Avatar + Nama + Tgl Daftar) */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#8C6E54] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {cust.initials}
                      </div>
                      <div>
                        <p className="font-bold text-[#2C1E1A] text-xs">
                          {cust.name}
                        </p>
                        <p className="text-[10px] text-[#6E543C] mt-0.5">
                          Terdaftar: {cust.registeredDate}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Kontak */}
                  <td className="py-3.5 px-4">
                    <p className="text-[11px] text-[#2C1E1A]">{cust.email}</p>
                    <p className="text-[10px] text-[#6E543C] font-mono mt-0.5">
                      {cust.phone}
                    </p>
                  </td>

                  {/* Lokasi */}
                  <td className="py-3.5 px-4 font-semibold text-[#3D2817]">
                    {cust.location}
                  </td>

                  {/* Pesanan */}
                  <td className="py-3.5 px-4 font-bold text-[#2C1E1A]">
                    {cust.orders} Pesanan
                  </td>

                  {/* Total Belanja */}
                  <td className="py-3.5 px-4 font-bold text-[#15803D]">
                    {cust.totalSpent}
                  </td>

                  {/* Tipe Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${getTypeBadge(
                        cust.type
                      )}`}
                    >
                      {cust.type}
                    </span>
                  </td>

                  {/* Aksi Buttons (<Eye/> & <MessageSquare/>) */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        title="Lihat Detail"
                        className="w-7 h-7 rounded-lg bg-[#8C6E54]/20 hover:bg-[#8C6E54]/30 text-[#3D2817] flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Kirim Pesan WhatsApp"
                        className="w-7 h-7 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white flex items-center justify-center transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-[#D9CBB7] bg-[#EAE2D2] gap-3">
          <p className="text-xs text-[#6E543C] font-medium">
            Menampilkan 1 - 5 dari 842 pelanggan
          </p>

          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#D9CBB7] flex items-center justify-center text-[#3D2817] hover:bg-white disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#3D2817] text-white flex items-center justify-center font-bold">
              1
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#D9CBB7] flex items-center justify-center text-[#3D2817] hover:bg-white">
              2
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#D9CBB7] flex items-center justify-center text-[#3D2817] hover:bg-white">
              3
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#D9CBB7] flex items-center justify-center text-[#3D2817] hover:bg-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
