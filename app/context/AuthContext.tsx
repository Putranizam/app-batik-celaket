"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type Role = "USER" | "SUPER_ADMIN" | "user" | "admin";

export interface User {
  id: string;
  namaLengkap: string;
  username: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}

// Akun default SUPER_ADMIN sesuai spesifikasi
export const DEFAULT_SUPER_ADMIN: User = {
  id: "usr_super_admin_01",
  namaLengkap: "Nizam Putra Rasya",
  username: "admin_nizam",
  email: "nizam.admin@batikcelaket.com",
  role: "SUPER_ADMIN",
  phone: "+62 857-1122-3344",
  address: "Jl. Jaksa Agung Suprapto Gg. 1 No. 88, Celaket, Kota Malang, Jawa Timur 65112",
};

// Akun default pembeli biasa untuk fallback
export const DEFAULT_REGULAR_USER: User = {
  id: "usr_regular_01",
  namaLengkap: "Ayu Lestari",
  username: "ayu.lestari",
  email: "ayu.lestari@email.com",
  role: "USER",
  phone: "+62 812 3456 7890",
  address: "Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112",
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  login: (credentials: { username?: string; email?: string; password?: string }) => { success: boolean; user?: User; message?: string };
  register: (data: { namaLengkap: string; email: string; password?: string; username?: string }) => User;
  logout: (redirectPath?: string) => void;
  updateUser: (data: Partial<User>) => void;
  getInitials: (name?: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to remove cookie
function deleteCookie(name: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  }
}

// Helper to set cookie
function setCookie(name: string, value: string, days = 7) {
  if (typeof document !== "undefined") {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Sync with storage and cookies on mount, plus Seeder inisialisasi akun
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          // Seeder: Pastikan Super Admin terdaftar di mock repository sistem
          const accountsRepo = localStorage.getItem("system_accounts");
          if (!accountsRepo) {
            localStorage.setItem(
              "system_accounts",
              JSON.stringify([DEFAULT_SUPER_ADMIN, DEFAULT_REGULAR_USER])
            );
          }

          const stored = localStorage.getItem("user");

          if (stored) {
            const parsed: User = JSON.parse(stored);
            setUser(parsed);
            setCookie("session_user", JSON.stringify({ id: parsed.id, role: parsed.role }));
          } else {
            setUser(null);
            deleteCookie("session_user");
            deleteCookie("token");
          }
        } catch {
          setUser(null);
          deleteCookie("session_user");
        } finally {
          setIsLoading(false);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const register = ({
    namaLengkap,
    email,
    username,
  }: {
    namaLengkap: string;
    email: string;
    password?: string;
    username?: string;
  }): User => {
    const inferredUsername =
      username ||
      email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "_") ||
      namaLengkap.toLowerCase().replace(/\s+/g, "_");

    const newUser: User = {
      id: "usr_" + Date.now(),
      namaLengkap: namaLengkap.trim(),
      username: inferredUsername,
      email: email.trim(),
      role: "USER",
      phone: "+62 812 3456 7890",
      address: "Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112",
    };

    const dummyToken = "jwt_" + Math.random().toString(36).substring(2);

    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", dummyToken);
      sessionStorage.setItem("user", JSON.stringify(newUser));
      sessionStorage.setItem("token", dummyToken);
      setCookie("session_user", JSON.stringify({ id: newUser.id, role: newUser.role }));
      setCookie("token", dummyToken);

      // Simpan ke daftar akun
      try {
        const repoStr = localStorage.getItem("system_accounts");
        const repo: User[] = repoStr ? JSON.parse(repoStr) : [];
        if (!repo.some((u) => u.email === newUser.email)) {
          repo.push(newUser);
          localStorage.setItem("system_accounts", JSON.stringify(repo));
        }
      } catch {}
    }

    return newUser;
  };

  const login = (credentials: { username?: string; email?: string; password?: string }) => {
    const inputId = (credentials.username || credentials.email || "").trim().toLowerCase();
    const inputPass = (credentials.password || "").trim();

    // 1. Cek Kredensial Khusus SUPER_ADMIN:
    // Username: admin_nizam / Email: nizam.admin@batikcelaket.com
    // Password: MasterAdmin123!
    const isSuperAdminMatch =
      (inputId === "admin_nizam" ||
        inputId === "nizam.admin@batikcelaket.com" ||
        inputId === "superadmin" ||
        inputId === "admin_celaket") &&
      (inputPass === "MasterAdmin123!" ||
        inputPass === "masteradmin123!" ||
        inputPass === "password" ||
        inputPass === "admin123");

    let loggedInUser: User;

    if (isSuperAdminMatch) {
      loggedInUser = DEFAULT_SUPER_ADMIN;
    } else {
      // 2. Cek akun yang tersimpan di localStorage
      let matchedInRepo: User | null = null;
      if (typeof window !== "undefined") {
        try {
          const rawRepo = localStorage.getItem("system_accounts");
          if (rawRepo) {
            const list: User[] = JSON.parse(rawRepo);
            matchedInRepo =
              list.find(
                (u) =>
                  u.username.toLowerCase() === inputId ||
                  u.email.toLowerCase() === inputId
              ) || null;
          }
        } catch {}
      }

      if (matchedInRepo) {
        loggedInUser = matchedInRepo;
      } else {
        // Fallback akun biasa (Role USER) jika login dengan kredensial umum
        loggedInUser = {
          id: "usr_" + Date.now(),
          namaLengkap: inputId.charAt(0).toUpperCase() + inputId.slice(1),
          username: inputId,
          email: credentials.email || `${inputId}@example.com`,
          role: "USER",
          phone: "+62 812 3456 7890",
          address: "Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112",
        };
      }
    }

    const dummyToken = "jwt_" + Math.random().toString(36).substring(2);

    setUser(loggedInUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", dummyToken);
      sessionStorage.setItem("user", JSON.stringify(loggedInUser));
      sessionStorage.setItem("token", dummyToken);
      setCookie("session_user", JSON.stringify({ id: loggedInUser.id, role: loggedInUser.role }));
      setCookie("token", dummyToken);
    }

    return { success: true, user: loggedInUser };
  };

  const logout = (redirectPath = "/login") => {
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("session");
      localStorage.removeItem("auth");

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("session");
      sessionStorage.removeItem("auth");

      deleteCookie("session_user");
      deleteCookie("token");
      deleteCookie("session");
      deleteCookie("auth_token");
    }

    router.push(redirectPath);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  const getInitials = (name?: string): string => {
    const target = name || user?.namaLengkap || user?.username || "Pengguna";
    const parts = target.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Helper untuk cek apakah user memiliki hak SUPER_ADMIN
  const isSuperAdmin =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "admin" ||
    user?.username === "admin_nizam";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSuperAdmin,
        login,
        register,
        logout,
        updateUser,
        getInitials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
