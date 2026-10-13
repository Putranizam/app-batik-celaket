"use client";

import React, { useState } from "react";
import {
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  ExternalLink,
  X,
  Search,
} from "lucide-react";

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  productName: string;
  productDetail?: string;
  total: string;
  status: "Menunggu" | "Diproses" | "Dikirim" | "Selesai";
  trackingNumber?: string;
  courier?: string;
}

const initialUserOrders: UserOrder[] = [
  {
    id: "1",
    orderNumber: "BC-2026-001",
    date: "18 Mar 2026",
    productName: "Kemeja Batik Tulis Sekar Jagad",
    productDetail: "Ukuran L • 1 pcs • Katun Primissima",
    total: "Rp 680.000",
    status: "Dikirim",
    trackingNumber: "JNEMLG20260318001",
    courier: "JNE Regular",
  },
  {
    id: "2",
    orderNumber: "BC-2026-002",
    date: "17 Mar 2026",
    productName: "Blouse Batik Modern Mega Mendung",
    productDetail: "Ukuran M • 1 pcs • Sutra Crepe",
    total: "Rp 450.000",
    status: "Diproses",
    courier: "SiCepat REG",
  },
  {
    id: "3",
    orderNumber: "BC-2026-003",
    date: "15 Mar 2026",
    productName: "Outer Silk Kebaya Motif Parang",
    productDetail: "Ukuran XL • 1 pcs • Sutra Halus",
    total: "Rp 520.000",
    status: "Selesai",
    trackingNumber: "JNT8849201991",
    courier: "J&T Express",
  },
  {
    id: "4",
    orderNumber: "BC-2026-004",
    date: "10 Mar 2026",
    productName: "Kain Batik Tulis Granit Celaket Malang",
    productDetail: "Panjang 2.25m • 2 pcs • Katun Mori",
    total: "Rp 950.000",
    status: "Selesai",
    trackingNumber: "POS9928172611",
    courier: "POS Indonesia",
  },
  {
    id: "5",
    orderNumber: "BC-2026-005",
    date: "05 Mar 2026",
    productName: "Syal Sutra Batik Celaket Motif Kawung",
    productDetail: "All Size • 1 pcs • Sutra Natural",
    total: "Rp 275.000",
    status: "Selesai",
    trackingNumber: "JNEMLG20260305012",
    courier: "JNE YES",
  },
  {
    id: "6",
    orderNumber: "BC-2026-006",
    date: "01 Mar 2026",
    productName: "Kemeja Pria Batik Celaket Kombinasi Songket",
    productDetail: "Ukuran M • 1 pcs • Katun Dobby",
    total: "Rp 620.000",
    status: "Menunggu",
    courier: "JNE Regular",
  },
];

export function UserOrderTable() {
  const [orders] = useState<UserOrder[]>(initialUserOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(query) ||
      order.productName.toLowerCase().includes(query) ||
      order.date.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status: UserOrder["status"]) => {
    switch (status) {
      case "Menunggu":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
            <Clock className="w-3.5 h-3.5" />
            Menunggu
          </span>
        );
      case "Diproses":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <Clock className="w-3.5 h-3.5" />
            Diproses
          </span>
        );
      case "Dikirim":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Truck className="w-3.5 h-3.5" />
            Dikirim
          </span>
        );
      case "Selesai":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selesai
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Bar & Total Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#8a7060] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari ID pesanan atau produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#ede3d5] rounded-xl text-xs sm:text-sm text-[#2C1E1A] placeholder-[#a89280] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all shadow-2xs"
          />
        </div>
        <div className="text-xs text-[#8a7060] font-medium self-end sm:self-center">
          Menampilkan <span className="font-bold text-[#2C1E1A]">{filteredOrders.length}</span> dari {orders.length} pesanan
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-[#ede3d5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#ede3d5] text-[#6c584c] font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                <th scope="col" className="py-3.5 px-4 sm:px-6">ID Pesanan</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Tanggal</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Produk</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Total</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Status</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede3d5]/70 text-[#2C1E1A]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8a7060]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="w-8 h-8 text-[#a89280]" />
                      <p className="font-medium text-sm">Tidak ada riwayat pesanan yang cocok.</p>
                      <p className="text-xs text-[#a89280]">Coba gunakan kata kunci pencarian yang lain.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FAF7F2]/60 transition-colors group"
                  >
                    {/* ID Pesanan */}
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#2C1E1A] whitespace-nowrap">
                      <span className="font-mono text-xs text-[#966431] bg-[#FDFBF7] px-2 py-1 rounded-md border border-[#ede3d5]">
                        #{order.orderNumber}
                      </span>
                    </td>

                    {/* Tanggal */}
                    <td className="py-4 px-4 sm:px-6 text-[#6c584c] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#a89280] shrink-0" />
                        <span>{order.date}</span>
                      </div>
                    </td>

                    {/* Produk */}
                    <td className="py-4 px-4 sm:px-6 min-w-[220px]">
                      <div>
                        <p className="font-bold text-[#2C1E1A] line-clamp-1 group-hover:text-[#966431] transition-colors">
                          {order.productName}
                        </p>
                        {order.productDetail && (
                          <p className="text-[11px] text-[#8a7060] mt-0.5">
                            {order.productDetail}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#2C1E1A] whitespace-nowrap">
                      <span className="text-[#966431] font-semibold">{order.total}</span>
                    </td>

                    {/* Status (Badge) */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Aksi (Teks Detail) */}
                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#966431] hover:text-[#6a421b] font-semibold text-xs sm:text-sm hover:underline cursor-pointer transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Pesanan */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#ede3d5] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ede3d5]">
              <div>
                <h3 className="font-bold text-base text-[#2C1E1A]">
                  Detail Pesanan #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[#8a7060]">
                  Dipesan pada {selectedOrder.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#8a7060] hover:bg-[#FAF7F2] hover:text-[#2C1E1A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-[#ede3d5]/60">
                <span className="text-[#8a7060]">Status Pesanan</span>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              <div className="py-2 border-b border-[#ede3d5]/60 space-y-1">
                <span className="text-[#8a7060] block">Produk yang Dibeli</span>
                <p className="font-semibold text-[#2C1E1A]">{selectedOrder.productName}</p>
                {selectedOrder.productDetail && (
                  <p className="text-xs text-[#8a7060]">{selectedOrder.productDetail}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 border-b border-[#ede3d5]/60">
                <div>
                  <span className="text-[#8a7060] block text-xs">Jasa Ekspedisi</span>
                  <span className="font-medium text-[#2C1E1A]">{selectedOrder.courier || "JNE Regular"}</span>
                </div>
                <div>
                  <span className="text-[#8a7060] block text-xs">Nomor Resi</span>
                  <span className="font-mono text-xs font-semibold text-[#966431]">
                    {selectedOrder.trackingNumber || "Belum ada resi"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 bg-[#FAF7F2] px-4 rounded-xl">
                <span className="font-medium text-[#6c584c]">Total Pembayaran</span>
                <span className="font-bold text-base text-[#966431]">{selectedOrder.total}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#ede3d5] text-[#2C1E1A] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrderTable;
