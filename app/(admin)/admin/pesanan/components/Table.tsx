"use client";

import React, { useState } from "react";
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  X,
  FileCheck,
  ChevronDown,
} from "lucide-react";

export type OrderStatus = "Menunggu" | "Diproses" | "Dikirim" | "Selesai";

export interface AdminOrderItem {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerPhone?: string;
  productName: string;
  productQty: number;
  totalAmount: string;
  status: OrderStatus;
  resiNumber?: string;
  courier?: string;
}

const initialAdminOrders: AdminOrderItem[] = [
  {
    id: "1",
    orderNumber: "BC-2026-001",
    buyerName: "Nizam Putra Rasya",
    buyerPhone: "0812-3456-7890",
    productName: "Kemeja Batik Tulis Sekar Jagad (L)",
    productQty: 1,
    totalAmount: "Rp 680.000",
    status: "Dikirim",
    resiNumber: "JNEMLG20260318001",
    courier: "JNE Regular",
  },
  {
    id: "2",
    orderNumber: "BC-2026-002",
    buyerName: "Faishal Nur Firdaus",
    buyerPhone: "0813-9876-5432",
    productName: "Blouse Batik Modern Mega Mendung (M)",
    productQty: 1,
    totalAmount: "Rp 450.000",
    status: "Diproses",
    courier: "SiCepat REG",
  },
  {
    id: "3",
    orderNumber: "BC-2026-003",
    buyerName: "Muhammad Rendy Pratama",
    buyerPhone: "0857-1122-3344",
    productName: "Outer Silk Kebaya Motif Parang (XL)",
    productQty: 1,
    totalAmount: "Rp 520.000",
    status: "Selesai",
    resiNumber: "JNT8849201991",
    courier: "J&T Express",
  },
  {
    id: "4",
    orderNumber: "BC-2026-004",
    buyerName: "Dewi Sartika Putri",
    buyerPhone: "0821-4455-6677",
    productName: "Kain Batik Tulis Granit Celaket Malang (2m)",
    productQty: 2,
    totalAmount: "Rp 950.000",
    status: "Menunggu",
    courier: "POS Indonesia",
  },
  {
    id: "5",
    orderNumber: "BC-2026-005",
    buyerName: "Andi Wicaksono",
    buyerPhone: "0819-3344-5566",
    productName: "Syal Sutra Batik Celaket Motif Kawung",
    productQty: 1,
    totalAmount: "Rp 275.000",
    status: "Selesai",
    resiNumber: "JNEMLG20260305012",
    courier: "JNE YES",
  },
  {
    id: "6",
    orderNumber: "BC-2026-006",
    buyerName: "Siti Rahmawati",
    buyerPhone: "0878-9900-1122",
    productName: "Kemeja Pria Kombinasi Songket (M)",
    productQty: 1,
    totalAmount: "Rp 620.000",
    status: "Diproses",
    courier: "J&T Express",
  },
];

export function AdminOrderTable() {
  const [orders, setOrders] = useState<AdminOrderItem[]>(initialAdminOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal Input Resi state
  const [selectedOrderForResi, setSelectedOrderForResi] = useState<AdminOrderItem | null>(null);
  const [resiInput, setResiInput] = useState("");
  const [courierInput, setCourierInput] = useState("JNE Regular");

  // Handler update status via <select>
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const targetOrder = orders.find((o) => o.id === orderId);
    showToast(
      `Status pesanan #${targetOrder?.orderNumber || orderId} diperbarui menjadi "${newStatus}"`
    );
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Open modal Input Resi
  const handleOpenResiModal = (order: AdminOrderItem) => {
    setSelectedOrderForResi(order);
    setResiInput(order.resiNumber || "");
    setCourierInput(order.courier || "JNE Regular");
  };

  // Save resi
  const handleSaveResi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForResi) return;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrderForResi.id
          ? {
              ...order,
              resiNumber: resiInput.trim(),
              courier: courierInput,
              // If status was Menunggu or Diproses, update to Dikirim automatically when resi is entered
              status: order.status === "Menunggu" || order.status === "Diproses" ? "Dikirim" : order.status,
            }
          : order
      )
    );

    showToast(
      `Nomor resi untuk pesanan #${selectedOrderForResi.orderNumber} berhasil disimpan!`
    );
    setSelectedOrderForResi(null);
    setResiInput("");
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Semua" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Dynamic styling for status select dropdown
  const getSelectStyle = (status: OrderStatus) => {
    switch (status) {
      case "Menunggu":
        return "bg-amber-50 text-amber-800 border-amber-300 focus:ring-amber-500";
      case "Diproses":
        return "bg-orange-50 text-orange-700 border-orange-300 focus:ring-orange-500";
      case "Dikirim":
        return "bg-sky-50 text-sky-700 border-sky-300 focus:ring-sky-500";
      case "Selesai":
        return "bg-emerald-50 text-emerald-700 border-emerald-300 focus:ring-emerald-500";
      default:
        return "bg-gray-50 text-gray-700 border-gray-300 focus:ring-gray-500";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#3D2817] text-white px-4 py-3 rounded-xl shadow-lg border border-[#C5A059]/40 text-xs sm:text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <FileCheck className="w-4 h-4 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8a7060] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari ID pesanan, nama pembeli, atau produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#E4D8C4] rounded-xl text-xs sm:text-sm text-[#3D2817] placeholder-[#8a7060] focus:outline-none focus:border-[#3D2817] focus:ring-1 focus:ring-[#3D2817] transition-all"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["Semua", "Menunggu", "Diproses", "Dikirim", "Selesai"] as const).map(
            (status) => {
              const isActive = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#3D2817] text-white shadow-xs"
                      : "bg-[#FAF7F2] text-[#6E543C] hover:bg-[#F3ECE0] border border-[#E8DEC8]"
                  }`}
                >
                  {status}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F3ECE0] border-b border-[#E8DEC8] text-[#6E543C] font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                <th scope="col" className="py-3.5 px-4 sm:px-6">ID Pesanan</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Nama Pembeli</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Produk</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Total Belanja</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Status</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-center">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DEC8]/60 text-[#3D2817]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6E543C]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package className="w-8 h-8 text-[#A89280]" />
                      <p className="font-semibold text-sm">Tidak ada data pesanan.</p>
                      <p className="text-xs text-[#8a7060]">
                        Cobalah ubah filter status atau kata kunci pencarian.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FAF7F2]/60 transition-colors"
                  >
                    {/* ID Pesanan */}
                    <td className="py-4 px-4 sm:px-6 font-semibold whitespace-nowrap">
                      <span className="font-mono text-xs bg-[#FAF7F2] text-[#3D2817] px-2.5 py-1 rounded-md border border-[#E4D8C4]">
                        #{order.orderNumber}
                      </span>
                    </td>

                    {/* Nama Pembeli */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div>
                        <p className="font-bold text-[#3D2817]">{order.buyerName}</p>
                        {order.buyerPhone && (
                          <p className="text-[11px] text-[#6E543C] mt-0.5">
                            {order.buyerPhone}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Produk */}
                    <td className="py-4 px-4 sm:px-6 min-w-[200px]">
                      <div>
                        <p className="font-medium text-[#3D2817] line-clamp-1">
                          {order.productName}
                        </p>
                        <p className="text-[11px] text-[#6E543C] mt-0.5">
                          Jumlah: {order.productQty} pcs
                        </p>
                      </div>
                    </td>

                    {/* Total Belanja */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-bold text-[#3D2817]">
                      {order.totalAmount}
                    </td>

                    {/* Status (Elemen <select>) */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as OrderStatus
                            )
                          }
                          className={`appearance-none cursor-pointer text-xs font-semibold rounded-lg px-3 py-1.5 pr-8 border shadow-2xs focus:outline-none transition-colors ${getSelectStyle(
                            order.status
                          )}`}
                        >
                          <option value="Menunggu">Menunggu</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Dikirim">Dikirim</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </td>

                    {/* Aksi Admin: Tombol "Input Resi" */}
                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenResiModal(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D2817] text-white hover:bg-[#523722] text-xs font-medium transition-colors shadow-xs cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Input Resi</span>
                        </button>
                        {order.resiNumber && (
                          <span
                            title={`Resi: ${order.resiNumber}`}
                            className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono"
                          >
                            Tersedia
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Input Resi */}
      {selectedOrderForResi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E8DEC8] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
              <div>
                <h3 className="font-bold text-base text-[#3D2817]">
                  Input Nomor Resi Pengiriman
                </h3>
                <p className="text-xs text-[#6E543C]">
                  Pesanan #{selectedOrderForResi.orderNumber} - {selectedOrderForResi.buyerName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForResi(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6E543C] hover:bg-[#FAF7F2] hover:text-[#3D2817] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveResi} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3D2817] mb-1.5">
                  Jasa Ekspedisi / Kurir
                </label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E4D8C4] rounded-xl text-xs sm:text-sm text-[#3D2817] focus:outline-none focus:border-[#3D2817] focus:ring-1 focus:ring-[#3D2817]"
                >
                  <option value="JNE Regular">JNE Regular</option>
                  <option value="JNE YES">JNE YES (Yakin Esok Sampai)</option>
                  <option value="J&T Express">J&T Express</option>
                  <option value="SiCepat REG">SiCepat REG</option>
                  <option value="POS Indonesia">POS Indonesia (Kilat Khusus)</option>
                  <option value="Anteraja">Anteraja</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D2817] mb-1.5">
                  Nomor Resi Pengiriman
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: JNEMLG12345678"
                  value={resiInput}
                  onChange={(e) => setResiInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E4D8C4] rounded-xl text-xs sm:text-sm font-mono text-[#3D2817] placeholder-[#a89280] focus:outline-none focus:border-[#3D2817] focus:ring-1 focus:ring-[#3D2817]"
                />
                <p className="text-[11px] text-[#6E543C] mt-1">
                  *Status pesanan akan otomatis disesuaikan menjadi &quot;Dikirim&quot;.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForResi(null)}
                  className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#6E543C] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D2817] hover:bg-[#523722] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Simpan Resi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrderTable;
