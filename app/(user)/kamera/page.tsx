"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import DesktopNavbar from "../../components/DesktopNavbar";
import {
  Sparkles,
  Camera,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Upload,
  Lightbulb,
  ImagePlus,
  X,
  FolderOpen,
} from "lucide-react";

type InputMode = "camera" | "upload";

export default function KameraPage() {
  // =============== STATE MANAGEMENT ===============
  const [inputMode, setInputMode] = useState<InputMode>("camera");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Upload mode state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // =============== CAMERA FUNCTIONS ===============

  // Hentikan semua stream aktif
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  // Inisialisasi dan buka stream webcam dengan advanced constraints
  const startCamera = useCallback(async () => {
    setHasError(false);
    setErrorMessage("");

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Perangkat atau browser tidak mendukung fitur akses kamera."
        );
      }

      // Hentikan stream yang ada jika sedang berjalan
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1920, min: 1280, max: 3840 },
          height: { ideal: 1080, min: 720, max: 2160 },
          frameRate: { ideal: 30 },
        },
        audio: false,
      });

      streamRef.current = stream;

      // Terapkan advanced constraints (autofocus & auto-exposure) jika didukung
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const caps = (videoTrack as any).getCapabilities?.() as Record<string, unknown> | undefined;
          if (caps) {
            const advancedConstraints: Record<string, unknown>[] = [];

            // Continuous focus mode jika didukung
            if (
              Array.isArray(caps.focusMode) &&
              (caps.focusMode as string[]).includes("continuous")
            ) {
              advancedConstraints.push({ focusMode: "continuous" });
            }

            // Continuous exposure mode jika didukung
            if (
              Array.isArray(caps.exposureMode) &&
              (caps.exposureMode as string[]).includes("continuous")
            ) {
              advancedConstraints.push({ exposureMode: "continuous" });
            }

            // Continuous white balance jika didukung
            if (
              Array.isArray(caps.whiteBalanceMode) &&
              (caps.whiteBalanceMode as string[]).includes("continuous")
            ) {
              advancedConstraints.push({ whiteBalanceMode: "continuous" });
            }

            if (advancedConstraints.length > 0) {
              await videoTrack.applyConstraints({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                advanced: advancedConstraints as any,
              });
            }
          }
        } catch (constraintErr) {
          console.warn(
            "Advanced camera constraints not supported:",
            constraintErr
          );
        }
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            ?.play()
            .catch((e) => console.warn("Video play error:", e));
        };
      }

      setIsStreaming(true);
    } catch (err: unknown) {
      console.warn(
        "Akses kamera tidak diizinkan atau tidak ditemukan:",
        err
      );
      setIsStreaming(false);
      setHasError(true);
      setErrorMessage(
        "Akses kamera tidak diizinkan. Silakan periksa pengaturan izin peramban Anda."
      );
    }
  }, [stopCamera]);

  // Membuka stream kamera secara otomatis saat mode kamera aktif
  useEffect(() => {
    let isCancelled = false;
    if (inputMode === "camera") {
      const timer = setTimeout(() => {
        if (!isCancelled) {
          startCamera();
        }
      }, 0);
      return () => {
        isCancelled = true;
        clearTimeout(timer);
        stopCamera();
      };
    } else {
      const timer = setTimeout(() => {
        if (!isCancelled) {
          stopCamera();
        }
      }, 0);
      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMode]);

  // Pastikan saat retake, videoRef tetap tersambung ke stream aktif
  useEffect(() => {
    if (
      inputMode === "camera" &&
      capturedImage === null &&
      streamRef.current &&
      videoRef.current
    ) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      videoRef.current
        .play()
        .catch((e) => console.warn("Video play error on retake:", e));
    }
  }, [capturedImage, inputMode]);

  // =============== CAPTURE FUNCTION (dengan Image Enhancement) ===============
  const handleCapture = () => {
    setIsCapturing(true);

    if (videoRef.current) {
      const video = videoRef.current;
      const nativeWidth = video.videoWidth;
      const nativeHeight = video.videoHeight;

      if (nativeWidth > 0 && nativeHeight > 0) {
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = nativeWidth;
        offscreenCanvas.height = nativeHeight;

        const ctx = offscreenCanvas.getContext("2d");
        if (ctx) {
          // Aktifkan image smoothing berkualitas tinggi
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Terapkan filter penyesuaian warna untuk mengatasi gambar pucat/pudar dari webcam
          ctx.filter = "contrast(108%) brightness(98%) saturate(110%)";

          // Balik horizontal (mirror) agar hasil foto sesuai preview
          ctx.translate(offscreenCanvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(
            video,
            0,
            0,
            offscreenCanvas.width,
            offscreenCanvas.height
          );

          // Ekspor JPEG kualitas tinggi
          const dataUrl = offscreenCanvas.toDataURL("image/jpeg", 0.95);
          setCapturedImage(dataUrl);
          setUploadedFileName(null);
        }
      } else {
        console.warn("Video dimensions not available yet.");
      }
    }

    setTimeout(() => {
      setIsCapturing(false);
    }, 400);
  };

  // =============== UPLOAD FUNCTIONS ===============
  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (JPG, PNG, WebP, dll).");
      return;
    }

    // Batas ukuran 15MB
    if (file.size > 15 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 15MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Terapkan enhancement pada gambar yang diunggah via canvas
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            // Enhancement ringan pada file upload (kontras & saturasi sedikit lebih kecil karena foto HP biasanya sudah baik)
            ctx.filter = "contrast(104%) brightness(99%) saturate(106%)";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const enhancedUrl = canvas.toDataURL("image/jpeg", 0.95);
            setCapturedImage(enhancedUrl);
            setUploadedFileName(file.name);
          }
        };
        img.src = result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processUploadedFile(file);
  };

  // =============== SHARED ACTIONS ===============
  const handleRetake = () => {
    setCapturedImage(null);
    setUploadedFileName(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePrimaryAction = () => {
    if (capturedImage) {
      handleRetake();
    } else if (inputMode === "camera") {
      handleCapture();
    } else {
      // Trigger file input dialog
      fileInputRef.current?.click();
    }
  };

  // Switch mode handler
  const handleModeSwitch = (mode: InputMode) => {
    if (mode === inputMode) return;
    handleRetake(); // Reset current image
    setInputMode(mode);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
      {/* Top Navbar */}
      <DesktopNavbar activeTab="beranda" />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link
              href="/beranda"
              className="hover:text-[#2C1E1A] transition-colors"
            >
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Kamera AI</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Kamera AI
          </h1>
        </div>

        {/* ================= TAB SWITCHER (Kamera / Upload) ================= */}
        <div className="mb-6">
          <div className="inline-flex items-center bg-[#EFE8DA] rounded-full p-1.5 border border-[#E0D5C0] shadow-sm">
            <button
              type="button"
              onClick={() => handleModeSwitch("camera")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                inputMode === "camera"
                  ? "bg-[#3D2817] text-[#FAF7F2] shadow-md"
                  : "text-[#6c584c] hover:text-[#2C1E1A] hover:bg-[#E6DEC8]/50"
              }`}
            >
              <Camera size={16} />
              <span>Gunakan Kamera</span>
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch("upload")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                inputMode === "upload"
                  ? "bg-[#3D2817] text-[#FAF7F2] shadow-md"
                  : "text-[#6c584c] hover:text-[#2C1E1A] hover:bg-[#E6DEC8]/50"
              }`}
            >
              <FolderOpen size={16} />
              <span>Unggah Gambar</span>
            </button>
          </div>
        </div>

        {/* Layout Tengah: Viewfinder/Upload (Kiri) + Panel Instruksi (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= AREA VIEWFINDER / UPLOAD (KOLOM KIRI) ================= */}
          <div className="lg:col-span-8 flex flex-col">
            {/* ========== MODE: KAMERA ========== */}
            {inputMode === "camera" && (
              <>
                {/* Container Utama Video */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[580px] rounded-3xl bg-[#2B211C] overflow-hidden shadow-xl flex items-center justify-center border border-[#3e2c24]">
                  {/* 1. Live Video Stream dengan CSS Filter Enhancement + Mirror */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover scale-x-[-1] contrast-[1.08] brightness-[0.98] saturate-[1.1] ${
                      capturedImage ? "hidden" : "block"
                    }`}
                  />

                  {/* 2. Freeze Frame Foto */}
                  {capturedImage && (
                    <div className="relative w-full h-full">
                      <Image
                        src={capturedImage}
                        alt="Hasil Foto Batik"
                        fill
                        unoptimized={capturedImage.startsWith("data:")}
                        className="object-cover object-center"
                      />
                      {/* Floating Action Button */}
                      <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-end pb-8 z-20">
                        <button
                          type="button"
                          onClick={handleRetake}
                          className="px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#2C1E1A] font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-[#dfb96c]/40"
                        >
                          <RefreshCw size={14} className="text-[#C5A059]" />
                          <span>Ambil Ulang Foto</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. Error State */}
                  {hasError && !capturedImage && (
                    <div className="absolute inset-0 bg-[#2B211C] flex flex-col items-center justify-center p-6 text-center z-20">
                      <div className="max-w-md bg-black/80 backdrop-blur-md p-7 rounded-2xl border border-red-500/40 text-center shadow-xl">
                        <AlertCircle
                          size={38}
                          className="text-red-400 mx-auto mb-3"
                        />
                        <p className="text-white text-xs sm:text-sm font-semibold mb-5 leading-relaxed">
                          {errorMessage}
                        </p>
                        <button
                          type="button"
                          onClick={startCamera}
                          className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#b08945] text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          Coba Lagi
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Badge Top-Left */}
                  <div className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b120e]/80 backdrop-blur-md border border-[#c5a059]/50 shadow-sm text-xs font-semibold text-[#f5eedf]">
                    <Sparkles size={14} className="text-[#c5a059]" />
                    <span>Kamera AI</span>
                  </div>

                  {/* Frame Overlay Batik */}
                  {!capturedImage && !hasError && (
                    <div className="absolute inset-x-[18%] sm:inset-x-[22%] inset-y-8 sm:inset-y-10 border border-[#c5a059]/75 rounded-2xl pointer-events-none z-10 shadow-[0_0_25px_rgba(197,160,89,0.2)] flex flex-col justify-between p-3">
                      <div className="flex justify-between">
                        <span className="w-4 h-4 border-t-2 border-l-2 border-[#dfb96c] rounded-tl" />
                        <span className="w-4 h-4 border-t-2 border-r-2 border-[#dfb96c] rounded-tr" />
                      </div>
                      <div className="flex justify-between">
                        <span className="w-4 h-4 border-b-2 border-l-2 border-[#dfb96c] rounded-bl" />
                        <span className="w-4 h-4 border-b-2 border-r-2 border-[#dfb96c] rounded-br" />
                      </div>
                    </div>
                  )}

                  {/* Efek Flash Shutter */}
                  {isCapturing && (
                    <div className="absolute inset-0 bg-white/70 animate-ping z-30 pointer-events-none" />
                  )}
                </div>

                {/* Bagian Bawah Kamera: Link + Shutter + Status */}
                <div className="relative flex items-center justify-between mt-6 px-4">
                  <Link
                    href="/produk"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2C1E1A] hover:text-[#C5A059] transition-colors group"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Kembali ke Produk</span>
                  </Link>

                  {/* Tombol Shutter */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={handlePrimaryAction}
                      aria-label={
                        capturedImage
                          ? "Ambil Ulang Foto"
                          : "Tombol Shutter Kamera"
                      }
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 sm:border-[5px] border-[#d8cec2] bg-white hover:bg-[#f6efe6] active:scale-90 transition-all flex items-center justify-center shadow-lg cursor-pointer group"
                    >
                      {capturedImage ? (
                        <RefreshCw className="w-6 h-6 text-[#C5A059] group-hover:rotate-180 transition-transform duration-300" />
                      ) : (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#e8ded1] group-hover:bg-[#dfb96c]/40 transition-colors" />
                      )}
                    </button>
                  </div>

                  {/* Status Indikator */}
                  <div className="w-28 text-right hidden sm:block">
                    {capturedImage ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#C5A059] font-semibold">
                        <CheckCircle2 size={12} />
                        <span>Foto Tersimpan</span>
                      </span>
                    ) : isStreaming ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Stream</span>
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Tips Pencahayaan (hanya mode kamera, tanpa foto) */}
                {!capturedImage && (
                  <div className="mt-5 mx-4 flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-[#FEF9EF] border border-[#E6DEC8] text-[#7a6a54]">
                    <Lightbulb
                      size={16}
                      className="text-[#C5A059] shrink-0 mt-0.5"
                    />
                    <p className="text-xs leading-relaxed">
                      <span className="font-semibold text-[#5c4a38]">
                        Tips:
                      </span>{" "}
                      Pastikan wajah/baju menghadap ke arah cahaya dan hindari
                      latar belakang yang terlalu terang agar hasil maksimal.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* ========== MODE: UPLOAD ========== */}
            {inputMode === "upload" && (
              <>
                {/* Area preview jika sudah ada gambar terunggah */}
                {capturedImage ? (
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[580px] rounded-3xl bg-[#2B211C] overflow-hidden shadow-xl border border-[#3e2c24]">
                    <Image
                      src={capturedImage}
                      alt="Gambar Terunggah"
                      fill
                      unoptimized={capturedImage.startsWith("data:")}
                      className="object-contain bg-[#1e1612]"
                    />

                    {/* Badge Top-Left */}
                    <div className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b120e]/80 backdrop-blur-md border border-[#c5a059]/50 shadow-sm text-xs font-semibold text-[#f5eedf]">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Gambar Siap</span>
                    </div>

                    {/* Nama File */}
                    {uploadedFileName && (
                      <div className="absolute bottom-6 left-6 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b120e]/80 backdrop-blur-md border border-[#c5a059]/30 shadow-sm text-xs text-[#e8dcc8] max-w-[280px]">
                        <ImagePlus size={13} className="text-[#c5a059] shrink-0" />
                        <span className="truncate">{uploadedFileName}</span>
                      </div>
                    )}

                    {/* Tombol Hapus */}
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600/80 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer active:scale-90 border border-white/10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  /* Drag & Drop Area */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[580px] rounded-3xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 border-dashed group ${
                      isDragging
                        ? "border-[#C5A059] bg-[#C5A059]/10 shadow-[0_0_40px_rgba(197,160,89,0.15)]"
                        : "border-[#d8cec2] bg-[#f6f1e8] hover:border-[#C5A059]/60 hover:bg-[#f0e9dc]"
                    }`}
                  >
                    {/* Decorative Batik Pattern Background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233D2817' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Upload Icon */}
                    <div
                      className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-5 transition-all duration-300 ${
                        isDragging
                          ? "bg-[#C5A059] text-white scale-110 shadow-lg"
                          : "bg-[#E6DEC8] text-[#8a7060] group-hover:bg-[#C5A059]/20 group-hover:text-[#C5A059]"
                      }`}
                    >
                      <Upload
                        size={32}
                        strokeWidth={1.8}
                        className={`transition-transform duration-300 ${
                          isDragging ? "animate-bounce" : "group-hover:-translate-y-1"
                        }`}
                      />
                    </div>

                    {/* Upload Text */}
                    <h3 className="text-base sm:text-lg font-bold text-[#2C1E1A] mb-1.5">
                      {isDragging
                        ? "Lepas untuk mengunggah..."
                        : "Seret & lepas gambar di sini"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8a7060] mb-5">
                      atau klik untuk memilih dari perangkat
                    </p>

                    {/* File Type Info */}
                    <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-[#a39280] font-medium">
                      <span className="px-2.5 py-1 rounded-full bg-[#EFE8DA] border border-[#E0D5C0]">
                        JPG
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#EFE8DA] border border-[#E0D5C0]">
                        PNG
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#EFE8DA] border border-[#E0D5C0]">
                        WebP
                      </span>
                      <span className="text-[#b8a896]">Maks. 15MB</span>
                    </div>
                  </div>
                )}

                {/* Bottom Actions for Upload Mode */}
                <div className="relative flex items-center justify-between mt-6 px-4">
                  <Link
                    href="/produk"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2C1E1A] hover:text-[#C5A059] transition-colors group"
                  >
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Kembali ke Produk</span>
                  </Link>

                  {/* Upload/Retake button di tengah */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={handlePrimaryAction}
                      aria-label={
                        capturedImage
                          ? "Ganti Gambar"
                          : "Pilih File"
                      }
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 sm:border-[5px] border-[#d8cec2] bg-white hover:bg-[#f6efe6] active:scale-90 transition-all flex items-center justify-center shadow-lg cursor-pointer group"
                    >
                      {capturedImage ? (
                        <RefreshCw className="w-6 h-6 text-[#C5A059] group-hover:rotate-180 transition-transform duration-300" />
                      ) : (
                        <Upload className="w-6 h-6 text-[#8a7060] group-hover:text-[#C5A059] transition-colors" />
                      )}
                    </button>
                  </div>

                  {/* Status */}
                  <div className="w-28 text-right hidden sm:block">
                    {capturedImage ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#C5A059] font-semibold">
                        <CheckCircle2 size={12} />
                        <span>Siap Dianalisis</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#8a7060] font-medium">
                        <Upload size={12} />
                        <span>Pilih Gambar</span>
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ================= PANEL INSTRUKSI (KOLOM KANAN) ================= */}
          <div className="lg:col-span-4">
            <div className="bg-[#f9f5ee] rounded-3xl border border-[#ede3d5] p-7 sm:p-8 shadow-xs space-y-6">
              {/* Header Card */}
              <div className="w-14 h-14 rounded-2xl bg-[#C5A059] flex items-center justify-center text-white shadow-md">
                {inputMode === "camera" ? (
                  <Camera size={26} strokeWidth={2.2} />
                ) : (
                  <Upload size={26} strokeWidth={2.2} />
                )}
              </div>

              <div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1E1A] mb-2">
                  {inputMode === "camera"
                    ? "Kamera AI"
                    : "Unggah Gambar"}
                </h2>
                <p className="text-xs sm:text-sm text-[#6c584c] leading-relaxed">
                  {inputMode === "camera"
                    ? "Arahkan kamera ke batik yang ingin kamu identifikasi motifnya."
                    : "Unggah foto batik beresolusi tinggi dari galeri atau penyimpanan perangkatmu."}
                </p>
              </div>

              <hr className="border-[#ede3d5]" />

              {/* Langkah Instruksi (dinamis berdasarkan mode) */}
              <div className="space-y-4">
                {inputMode === "camera" ? (
                  <>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">
                        Siapkan gambar batik
                      </p>
                      <p className="text-xs text-[#8a7060] leading-relaxed mt-1 font-normal">
                        Pastikan motif terlihat jelas dan berada di dalam area
                        pengambilan gambar.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">
                        Ambil foto
                      </p>
                      <p className="text-xs text-[#8a7060] leading-relaxed mt-1 font-normal">
                        Gunakan tombol kamera di bawah pratinjau.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">
                        Pilih foto terbaik
                      </p>
                      <p className="text-xs text-[#8a7060] leading-relaxed mt-1 font-normal">
                        Gunakan foto beresolusi tinggi dengan motif batik yang
                        tampak jelas dan pencahayaan merata.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#2C1E1A]">
                        Seret atau pilih file
                      </p>
                      <p className="text-xs text-[#8a7060] leading-relaxed mt-1 font-normal">
                        Format yang didukung: JPG, PNG, WebP. Ukuran
                        maksimal 15MB.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Tombol Utama */}
              <button
                type="button"
                onClick={handlePrimaryAction}
                className={`w-full font-bold text-sm py-4 rounded-full shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
                  capturedImage
                    ? "bg-[#3D2817] hover:bg-[#523722] text-[#FAF7F2]"
                    : "bg-[#C5A059] hover:bg-[#b08945] text-white"
                } active:scale-[0.98]`}
              >
                {capturedImage ? (
                  <>
                    <RefreshCw size={16} />
                    <span>
                      {inputMode === "camera"
                        ? "Ambil Ulang Foto"
                        : "Ganti Gambar"}
                    </span>
                  </>
                ) : (
                  <>
                    {inputMode === "camera" ? (
                      <span>Ambil Foto</span>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Pilih dari Perangkat</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
