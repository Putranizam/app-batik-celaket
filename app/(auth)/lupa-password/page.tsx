"use client";

import Link from "next/link";
import { useState } from "react";
import BatikLogo from "../../components/BatikLogo";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function LupaPasswordPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrUsername.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F6F0] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#C5A059]/20">
      {/* Centered Form Card */}
      <div className="w-full max-w-[430px] bg-[#F4EFE6] rounded-3xl p-8 sm:p-10 shadow-xs border border-[#EBE4D8]">
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
            Lupa Password?
          </h1>
          <p className="text-xs sm:text-[13px] text-[#6c584c] leading-relaxed">
            Masukkan email atau username terdaftar Anda. Kami akan mengirimkan link untuk mereset kata sandi.
          </p>
        </div>

        {submitted && (
          <div className="mb-5 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 inline-block shrink-0" />
            <span>Link reset password telah dikirim ke email Anda. Silakan cek kotak masuk.</span>
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#7a675b] uppercase mb-1.5">
              EMAIL / USERNAME
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Masukkan email terdaftar admin..."
              required
              className="w-full h-12 px-4 rounded-xl bg-white text-sm text-[#2C1E1A] placeholder:text-[#a09084] border border-[#ded4c5] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
            />
          </div>

          {/* Tombol Utama */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#4A2E1B] hover:bg-[#3b2415] active:scale-[0.99] text-[#F9F5EF] font-bold text-sm transition-all cursor-pointer shadow-md mt-2"
          >
            Kirim Link Reset Password
          </button>

          {/* Tombol Sekunder */}
          <Link
            href="/login"
            className="w-full h-12 rounded-xl bg-white hover:bg-[#faf7f2] active:scale-[0.99] text-[#2C1E1A] border border-[#ded4c5] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs mt-2"
          >
            <ArrowLeft className="w-4 h-4 inline-block shrink-0" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
