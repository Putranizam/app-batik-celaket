import React from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

export default function AdminPesananPage() {
  return (
    <div className="space-y-6">
      <PageHeaderBanner
        title="Daftar Pesanan"
        description="Kelola dan pantau seluruh transaksi pesanan batik dari pelanggan"
      />
      <div className="bg-[#F3ECE0] rounded-2xl p-8 border border-[#E4D8C4] text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#3D2817] text-[#FAF7F2] flex items-center justify-center mx-auto">
          <Package className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#3D2817]">
          Modul Pesanan
        </h3>
        <p className="text-xs text-[#6E543C] max-w-md mx-auto">
          Data pesanan terintegrasi langsung dengan modul ringkasan utama di Dashboard.
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 bg-[#3D2817] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#523722]"
        >
          <span>Kembali ke Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
