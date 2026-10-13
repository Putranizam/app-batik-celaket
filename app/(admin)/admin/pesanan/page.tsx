import React from "react";
import PageHeaderBanner from "../components/PageHeaderBanner";
import { AdminOrderTable } from "./components/Table";
import { ShoppingBag, Clock, Truck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Manajemen Pesanan - Admin Batik Celaket",
  description: "Kelola pesanan pelanggan dan status pengiriman",
};

export default function AdminPesananPage() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <PageHeaderBanner
        title="Manajemen Pesanan"
        description="Pantau dan kelola seluruh transaksi pembelian batik dari pelanggan, ubah status pesanan, serta perbarui nomor resi pengiriman."
      />

      {/* Mini Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.03)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#3D2817] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#6E543C] tracking-wider">
              Total Masuk
            </p>
            <p className="text-base sm:text-lg font-bold text-[#3D2817]">6 Pesanan</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.03)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#6E543C] tracking-wider">
              Menunggu / Proses
            </p>
            <p className="text-base sm:text-lg font-bold text-[#3D2817]">3 Pesanan</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.03)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#6E543C] tracking-wider">
              Dalam Pengiriman
            </p>
            <p className="text-base sm:text-lg font-bold text-[#3D2817]">1 Pesanan</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.03)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#6E543C] tracking-wider">
              Selesai
            </p>
            <p className="text-base sm:text-lg font-bold text-[#3D2817]">2 Pesanan</p>
          </div>
        </div>
      </div>

      {/* Tabel Data Manajemen Pesanan Admin */}
      <section aria-label="Tabel Manajemen Pesanan" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-bold text-[#3D2817]">
            Daftar Semua Pesanan Pelanggan
          </h2>
          <span className="text-xs text-[#6E543C]">
            Sinkronisasi Otomatis
          </span>
        </div>

        {/* Component Render */}
        <AdminOrderTable />
      </section>
    </div>
  );
}
