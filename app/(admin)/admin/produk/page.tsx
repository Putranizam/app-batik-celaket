import React from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function AdminProdukPage() {
  return (
    <div className="space-y-6">
      <PageHeaderBanner
        title="Katalog Produk"
        description="Kelola koleksi batik, inventaris stok, dan varian motif batik celaket"
      />
      <div className="bg-[#F3ECE0] rounded-2xl p-8 border border-[#E4D8C4] text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#3D2817] text-[#FAF7F2] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#3D2817]">
          Katalog Produk Batik
        </h3>
        <p className="text-xs text-[#6E543C] max-w-md mx-auto">
          Inventaris produk terintegrasi dengan daftar produk terlaris dan stok menipis pada Dashboard.
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
