"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BatikLogo from "../../components/BatikLogo";
import { Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = username.trim();

    // Jalankan autentikasi melalui AuthContext
    const res = login({
      username: trimmed,
      password,
    });

    if (res.success) {
      setStatus("success");
      setTimeout(() => {
        // Jika yang login adalah SUPER_ADMIN, bisa langsung diarahkan ke /admin/dashboard atau /beranda
        if (res.user?.role === "SUPER_ADMIN" || res.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/beranda");
        }
      }, 1000);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F6F0] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#C5A059]/20">
      {/* Centered Form Card */}
      <div className="w-full max-w-[440px] bg-[#F4EFE6] rounded-3xl p-8 sm:p-10 shadow-xs border border-[#EBE4D8]">
        {/* Logo Batik Celaket */}
        <div className="flex items-center gap-3.5 mb-6">
          <BatikLogo size={42} variant="dark-card" />
          <span className="font-serif-luxury text-2xl font-bold text-[#2C1E1A] tracking-tight">
            Batik Celaket
          </span>
        </div>

        {/* Judul & Deskripsi */}
        <div className="mb-6">
          <h1 className="font-serif-luxury text-3xl font-bold text-[#2C1E1A] mb-2 leading-tight">
            Masuk ke Akun
          </h1>
          <p className="text-xs sm:text-[13px] text-[#6c584c] leading-relaxed">
            Gunakan username dan password untuk mengakses dashboard Admin Batik Celaket.
          </p>
        </div>

        {/* Alert Box: State Error */}
        {status === "error" && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <AlertTriangle className="w-4 h-4 inline-block shrink-0" />
            <span>Username atau password salah. Silakan coba lagi.</span>
          </div>
        )}

        {/* Alert Box: State Success */}
        {status === "success" && (
          <div className="mb-5 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 inline-block shrink-0" />
            <span>Login Berhasil! Mengalihkan ke Dashboard...</span>
          </div>
        )}

        {/* Form Interaktif */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field Username */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#7a675b] uppercase mb-1.5">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Masukkan username"
              required
              className={`w-full h-12 px-4 rounded-xl bg-white text-sm text-[#2C1E1A] placeholder:text-[#a09084] outline-none transition-all ${
                status === "error"
                  ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                  : status === "success"
                  ? "border-2 border-green-500"
                  : "border border-[#ded4c5] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
              }`}
            />
          </div>

          {/* Field Password */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#7a675b] uppercase mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Masukkan password"
                required
                className={`w-full h-12 pl-4 pr-11 rounded-xl bg-white text-sm text-[#2C1E1A] placeholder:text-[#a09084] outline-none transition-all ${
                  status === "error"
                    ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                    : status === "success"
                    ? "border-2 border-green-500"
                    : "border border-[#ded4c5] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#2C1E1A] transition-colors cursor-pointer"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Tautan Lupa password */}
            <div className="text-right mt-1.5">
              <Link
                href="/lupa-password"
                className="text-xs font-semibold text-[#2C1E1A] hover:text-[#C5A059] transition-colors"
              >
                Lupa password?
              </Link>
            </div>
          </div>

          {/* Tombol Utama */}
          <button
            type="submit"
            disabled={status === "success"}
            className={`w-full h-12 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center ${
              status === "success"
                ? "bg-emerald-700 text-white"
                : "bg-[#4A2E1B] hover:bg-[#3b2415] active:scale-[0.99] text-[#F9F5EF]"
            }`}
          >
            {status === "success" ? "Menghubungkan..." : "Masuk"}
          </button>
        </form>

        {/* Footer Teks */}
        <p className="text-center text-xs text-[#78675c] mt-6">
          Belum memiliki akun?{" "}
          <Link
            href="/register"
            className="text-[#2C1E1A] font-bold hover:text-[#C5A059] transition-colors"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
