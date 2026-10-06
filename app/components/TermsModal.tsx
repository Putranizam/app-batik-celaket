import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export default function TermsModal({
  isOpen,
  onClose,
  onAccept,
}: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#F4EFE6] text-[#2C1E1A] rounded-2xl shadow-2xl overflow-hidden border border-[#C5A059]/40 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#2B1D19] p-5 text-[#F5EFE6] flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#DFB96C]" />
            <h3 className="font-serif-luxury font-bold text-lg tracking-wide text-[#F7EFE3]">
              Syarat & Ketentuan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#DFB96C] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-[#4E3F37] leading-relaxed">
          <section>
            <h4 className="font-serif-luxury font-bold text-[#2B1D19] text-base mb-1">
              1. Otentisitas Mahakarya Batik Celaket
            </h4>
            <p className="text-xs">
              Seluruh helai kain dan busana yang kami hadirkan dijamin 100% merupakan karya pengrajin Batik Celaket Malang, dibuat dengan ketelitian canting manual maupun cap tembaga tradisional warisan leluhur.
            </p>
          </section>

          <section>
            <h4 className="font-serif-luxury font-bold text-[#2B1D19] text-base mb-1">
              2. Kerahasiaan & Keamanan Akun
            </h4>
            <p className="text-xs">
              Data pribadi dan detail akun Anda dijaga dengan standar enkripsi tertinggi. Kami tidak akan pernah membagikan informasi Anda kepada pihak ketiga tanpa persetujuan tertulis.
            </p>
          </section>

          <section>
            <h4 className="font-serif-luxury font-bold text-[#2B1D19] text-base mb-1">
              3. Hak Kekayaan Intelektual Motif
            </h4>
            <p className="text-xs">
              Karakter motif khas Celaket Malang dilindungi oleh hak kekayaan intelektual komunal nusantara untuk menjaga marwah dan kelestarian kriya seni tradisional Malang Raya.
            </p>
          </section>

          <section>
            <h4 className="font-serif-luxury font-bold text-[#2B1D19] text-base mb-1">
              4. Garansi Kualitas & Pemeliharaan
            </h4>
            <p className="text-xs">
              Setiap pesanan disertai panduan perawatan kain dengan lerak alami guna menjaga kemilau pewarna soga dan ketahanan serat kain primissima.
            </p>
          </section>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#EBE0D0] border-t border-[#DFD1BE] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A4940] hover:bg-black/5 cursor-pointer transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              onAccept?.();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2B1D19] text-[#FDFBF7] hover:bg-[#3B2822] cursor-pointer transition-all shadow-md active:scale-95"
          >
            Saya Menyetujui
          </button>
        </div>
      </div>
    </div>
  );
}
