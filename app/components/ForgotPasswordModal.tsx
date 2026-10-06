import React, { useState } from "react";
import { X, KeyRound, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: (msg: string) => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccessToast,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      if (onSuccessToast) {
        onSuccessToast("Tautan reset kata sandi telah dikirim ke email Anda!");
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={handleReset}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm bg-[#F4EFE6] text-[#2C1E1A] rounded-2xl shadow-2xl overflow-hidden border border-[#C5A059]/40 z-10 animate-in zoom-in-95 duration-200">
        <div className="bg-[#2B1D19] p-5 text-[#F5EFE6] flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-[#DFB96C]" />
            <h3 className="font-serif-luxury font-bold text-lg text-[#F7EFE3]">
              Pemulihan Sandi
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#DFB96C] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Masukkan alamat email yang terdaftar pada akun Batik Celaket Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
              </p>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A493F] mb-1.5 uppercase tracking-wider">
                  Alamat Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-[#B88B4A]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#E8DDD0] border border-[#C5A059]/40 text-[#2B1D19] text-xs placeholder:text-[#8E7E73] focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#2B1D19] hover:bg-[#3B2822] text-[#FDFBF7] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <span>Mengirim Tautan...</span>
                ) : (
                  <>
                    <span>Kirim Tautan Reset</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#35251F] text-[#DFB96C] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif-luxury font-bold text-base text-[#2B1D19]">
                Tautan Terkirim!
              </h4>
              <p className="text-xs text-[#5C4D44] leading-relaxed">
                Kami telah mengirimkan instruksi pemulihan ke <span className="font-semibold text-[#2B1D19]">{email}</span>. Silakan periksa kotak masuk atau folder spam Anda.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 w-full py-2.5 rounded-xl bg-[#2B1D19] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider hover:bg-[#3B2822] transition-colors cursor-pointer"
              >
                Kembali ke Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
