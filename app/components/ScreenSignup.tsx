"use client";

import React, { useState } from "react";
import Link from "next/link";
import BatikLogo from "./BatikLogo";
import { Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";

import { useAuth, User } from "../context/AuthContext";

interface ScreenSignupProps {
  onMenuClick?: () => void;
  onLoginClick?: () => void;
  onTermsClick?: () => void;
  onSignupSuccess?: (data: User) => void;
  onLogoClick?: () => void;
  defaultName?: string;
  defaultEmail?: string;
}

export default function ScreenSignup({
  onLoginClick,
  onTermsClick,
  onSignupSuccess,
  defaultName = "",
  defaultEmail = "",
}: ScreenSignupProps) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Harap lengkapi semua kolom pendaftaran.");
      setStatus("error");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      setStatus("error");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Anda harus menyetujui Syarat dan Ketentuan.");
      setStatus("error");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setTimeout(() => {
      setIsLoading(false);
      setStatus("success");
      // Save to AuthContext / localStorage with { id, namaLengkap, username, email, role: 'user' }
      const registeredUser = register({
        namaLengkap: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (onSignupSuccess) {
        onSignupSuccess(registeredUser);
      }
    }, 700);
  };

  const clearError = () => {
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F6F0] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#C5A059]/20">
      {/* Centered Form Card — same dimensions & style as Login */}
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
            Buat Akun Baru
          </h1>
          <p className="text-xs sm:text-[13px] text-[#6c584c] leading-relaxed">
            Daftarkan akun untuk menjelajahi koleksi batik premium khas Celaket
            Malang.
          </p>
        </div>

        {/* Alert Box: Error */}
        {status === "error" && errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <AlertTriangle className="w-4 h-4 inline-block shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Alert Box: Success */}
        {status === "success" && (
          <div className="mb-5 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 inline-block shrink-0" />
            <span>Pendaftaran berhasil! Mengalihkan ke Dashboard...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#7a675b] uppercase mb-1.5">
              NAMA LENGKAP
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                clearError();
              }}
              placeholder="Masukkan nama lengkap"
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

          {/* Username / Email */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#7a675b] uppercase mb-1.5">
              USERNAME
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              placeholder="Masukkan email"
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

          {/* Password */}
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
                  clearError();
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
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#7a675b] uppercase mb-1.5">
              KONFIRMASI PASSWORD
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError();
                }}
                placeholder="Ulangi password"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#2C1E1A] transition-colors cursor-pointer"
                aria-label={
                  showConfirmPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Syarat & Ketentuan */}
          <div className="flex items-center gap-2.5 px-0.5">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-400 text-[#2C1E1A] focus:ring-[#C5A059] accent-[#2C1E1A] cursor-pointer shrink-0"
            />
            <label
              htmlFor="termsCheckbox"
              className="text-xs text-[#6c584c] cursor-pointer select-none"
            >
              Saya menyetujui{" "}
              <button
                type="button"
                onClick={onTermsClick}
                className="text-[#2C1E1A] font-bold hover:text-[#C5A059] transition-colors underline decoration-[#C5A059] decoration-1 underline-offset-2"
              >
                Syarat dan Ketentuan
              </button>
            </label>
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            disabled={isLoading || status === "success"}
            className={`w-full h-12 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center ${
              status === "success"
                ? "bg-emerald-700 text-white"
                : "bg-[#4A2E1B] hover:bg-[#3b2415] active:scale-[0.99] text-[#F9F5EF]"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#DFB96C] border-t-transparent rounded-full animate-spin" />
                <span>MENDAFTARKAN...</span>
              </div>
            ) : status === "success" ? (
              "Berhasil!"
            ) : (
              "DAFTAR"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-[#78675c] mt-6">
          Sudah punya akun?{" "}
          {onLoginClick ? (
            <button
              type="button"
              onClick={onLoginClick}
              className="text-[#2C1E1A] font-bold hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Masuk
            </button>
          ) : (
            <Link
              href="/login"
              className="text-[#2C1E1A] font-bold hover:text-[#C5A059] transition-colors"
            >
              Masuk
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}
