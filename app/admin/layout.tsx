import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import ProtectedRoute from "../components/ProtectedRoute";

export const metadata = {
  title: "Admin Dashboard - Batik Celaket",
  description: "Panel Kontrol Manajemen Batik Celaket",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireRole="SUPER_ADMIN" redirectTo="/login">
      <div className="min-h-screen w-full flex bg-[#FAF7F2] text-[#2C1E1A] antialiased">
        {/* Fixed Left Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 h-screen overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div className="max-w-[1400px] mx-auto pb-12">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
