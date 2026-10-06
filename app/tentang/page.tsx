import Link from "next/link";
import DesktopNavbar from "../components/DesktopNavbar";

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans selection:bg-[#C5A059]/20">
      {/* Top Navbar dengan Tentang Kami aktif */}
      <DesktopNavbar activeTab="tentang" />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs text-[#8a7060] mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/beranda" className="hover:text-[#2C1E1A] transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-[#2C1E1A]">Tentang Kami</span>
          </nav>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E1A] tracking-tight">
            Tentang Kami
          </h1>
        </div>

        {/* Layout Utama: Grid 2 Kolom Seimbang 50/50 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ================= KOLOM KIRI (PROFIL & KEUNGGULAN) ================= */}
          <div className="space-y-8">
            {/* Judul Selamat Datang */}
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1E1A] leading-tight mb-4">
                Selamat datang di Batik Celaket Malang!
              </h2>
              <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                Kami adalah wadah resmi yang menghadirkan keindahan warisan budaya khas Malang ke dalam genggaman Anda. Berawal dari kekayaan seni batik tradisional di Celaket, Malang, kami berkomitmen melestarikan identitas Nusantara dengan memadukan keahlian membatik klasik dan cita rasa busana modern.
              </p>
            </div>

            {/* Card Visi Kami: Card krem terang dengan garis aksen border kiri warna emas */}
            <div className="bg-[#f5ede1] rounded-2xl p-6 border-l-4 border-[#C5A059] border-t border-r border-b border-[#e5d8c6] shadow-2xs">
              <h3 className="font-serif-luxury text-lg font-bold text-[#2C1E1A] mb-2">
                Visi Kami
              </h3>
              <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                Menjadi pelopor busana batik modern khas Malang yang mendunia tanpa mengesampingkan nilai kebudayaan dan kesejahteraan pengrajin lokal.
              </p>
            </div>

            {/* Bagian Keunggulan Kami */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif-luxury text-xl font-bold text-[#2C1E1A]">
                Keunggulan Kami
              </h3>

              <div className="space-y-3">
                {/* Poin 1 */}
                <div className="border-b border-[#ede3d5] pb-3">
                  <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                    <strong className="text-[#2C1E1A] font-semibold">Koleksi Lengkap:</strong> Pilihan beragam mulai dari Kemeja Tulis, Blouse Modern, hingga Outer Silk Kebaya.
                  </p>
                </div>

                {/* Poin 2 */}
                <div>
                  <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                    <strong className="text-[#2C1E1A] font-semibold">Desain Eksklusif:</strong> Kombinasi motif tradisional dan potongan gaya modern.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= KOLOM KANAN (INFORMASI KONTAK & PETA) ================= */}
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1E1A]">
              Hubungi &amp; Kunjungi Kami
            </h2>

            {/* Card Putih Bersudut Lengkung (rounded-2xl, shadow halus) */}
            <div className="bg-white rounded-2xl border border-[#ede3d5] p-6 sm:p-7 shadow-xs space-y-5">
              {/* Nama Toko */}
              <div>
                <h3 className="font-bold text-base text-[#2C1E1A]">
                  Nama Toko: Batik Tulis CelaketKlik
                </h3>
              </div>

              {/* Alamat */}
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-[#5a483e] leading-relaxed">
                  Alamat: Jl. Jaksa Agung Suprapto No.71B, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65112
                </p>
              </div>

              {/* Telepon & Email */}
              <div className="space-y-1 text-xs sm:text-sm text-[#5a483e]">
                <p>Telepon / WA: (0341) 368606 / +62 813-3458-5892</p>
                <p>Email: support@batikcelaket.com</p>
              </div>

              {/* Label Lokasi di Google Maps */}
              <div className="pt-2">
                <p className="font-bold text-xs sm:text-sm text-[#2C1E1A] mb-3">
                  Lokasi di Google Maps:
                </p>

                {/* Kontainer Peta Embed Google Maps Preview Satelit / Maps Tile */}
                <div className="relative w-full h-80 rounded-xl overflow-hidden border border-[#ede3d5] shadow-xs">
                  <iframe
                    title="Lokasi Batik Tulis Celaket"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3857501704253!2d112.62886747589332!3d-7.959508992065096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629ce1dc12fa5%3A0x6b63065406085a30!2sBatik%20Tulis%20Celaket!5e0!3m2!1sid!2sid!4v1709971200000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
