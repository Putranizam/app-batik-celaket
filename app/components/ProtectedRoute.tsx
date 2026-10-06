"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, Role } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requireRole,
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  requireRole?: "USER" | "SUPER_ADMIN" | "admin" | "user";
  redirectTo?: string;
}) {
  const { user, isLoading, isSuperAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace(redirectTo);
        return;
      }

      // Jika rute membutuhkan SUPER_ADMIN / admin
      if (requireRole === "SUPER_ADMIN" || requireRole === "admin") {
        if (!isSuperAdmin) {
          // Role USER biasa dialihkan ke /beranda
          router.replace("/beranda");
        }
      }
    }
  }, [user, isLoading, requireRole, redirectTo, isSuperAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF7F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-[#6E543C]">Memeriksa hak akses...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Jika requireRole adalah admin dan bukan super admin
  if ((requireRole === "SUPER_ADMIN" || requireRole === "admin") && !isSuperAdmin) {
    return null;
  }

  return <>{children}</>;
}
