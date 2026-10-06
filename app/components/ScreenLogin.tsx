import React, { useState } from "react";
import BatikLogo from "./BatikLogo";
import TopNavBar from "./TopNavBar";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface ScreenLoginProps {
  onMenuClick?: () => void;
  onSignupClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLoginSuccess?: (email: string) => void;
  onLogoClick?: () => void;
  defaultEmail?: string;
  defaultPassword?: string;
}

export default function ScreenLogin({
  onMenuClick,
  onSignupClick,
  onForgotPasswordClick,
  onLoginSuccess,
  onLogoClick,
  defaultEmail = "",
  defaultPassword = "",
}: ScreenLoginProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Silakan lengkapi email dan kata sandi Anda.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(email);
      }
    }, 700);
  };

  return (
    <div className="relative w-full h-full min-h-[667px] max-w-[375px] mx-auto bg-[#ECE2D2] flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Top Navigation Bar */}
      <TopNavBar onMenuClick={onMenuClick} onLogoClick={onLogoClick} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-2 pb-6">
        {/* Brand Centerpiece */}
        <div className="flex flex-col items-center text-center mb-7">
          <BatikLogo size={78} variant="dark-card" className="mb-3.5 shadow-md" />
          <h2 className="font-serif-luxury font-bold text-[28px] text-[#261713] leading-tight tracking-tight">
            Batik Celaket
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          {errorMessage && (
            <div className="p-2.5 rounded-lg bg-red-100/80 border border-red-300 text-red-800 text-xs text-center animate-in fade-in">
              {errorMessage}
            </div>
          )}

          {/* Email Field */}
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-[#B88B4A] pointer-events-none flex items-center justify-center">
              <Mail className="w-[18px] h-[18px] stroke-[1.8]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-[#E3D6C3] border border-[#C5A059]/40 text-[#261713] text-[13.5px] placeholder:text-[#8D7B70] focus:outline-none focus:border-[#C5A059] focus:bg-[#E8DCCB] focus:ring-2 focus:ring-[#C5A059]/30 transition-all font-sans-modern"
            />
          </div>

          {/* Kata Sandi Field */}
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-[#B88B4A] pointer-events-none flex items-center justify-center">
              <Lock className="w-[18px] h-[18px] stroke-[1.8]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kata Sandi"
              required
              className="w-full h-[48px] pl-11 pr-11 rounded-xl bg-[#E3D6C3] border border-[#C5A059]/40 text-[#261713] text-[13.5px] placeholder:text-[#8D7B70] focus:outline-none focus:border-[#C5A059] focus:bg-[#E8DCCB] focus:ring-2 focus:ring-[#C5A059]/30 transition-all font-sans-modern"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
              className="absolute right-3.5 text-[#B88B4A] hover:text-[#8C6428] cursor-pointer p-1 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-[18px] h-[18px] stroke-[1.8]" />
              ) : (
                <Eye className="w-[18px] h-[18px] stroke-[1.8]" />
              )}
            </button>
          </div>

          {/* MASUK Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] mt-1.5 rounded-xl bg-[#261713] hover:bg-[#38231C] active:scale-[0.98] text-[#F9F5EF] font-sans-modern font-bold text-[13.5px] tracking-widest uppercase flex items-center justify-center shadow-md transition-all cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#DFB96C] border-t-transparent rounded-full animate-spin" />
                <span>MEMPROSES...</span>
              </div>
            ) : (
              <span>MASUK</span>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-5 flex flex-col items-center gap-2 font-sans-modern text-[12px]">
          {/* Lupa Kata Sandi? */}
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-[#B68D45] hover:text-[#8E6A2A] font-medium transition-colors cursor-pointer"
          >
            Lupa Kata Sandi?
          </button>

          {/* Belum punya akun? Daftar */}
          <p className="text-[#78675C]">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={onSignupClick}
              className="text-[#B68D45] font-bold hover:text-[#8E6A2A] hover:underline cursor-pointer transition-colors"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>

      {/* Decorative bottom subtle bar */}
      <div className="w-28 h-1 rounded-full bg-[#261713]/15 mx-auto mb-2" />
    </div>
  );
}
