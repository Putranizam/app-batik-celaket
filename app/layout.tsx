import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Batik Celaket - Toko Batik Premium Khas Malang",
  description:
    "Temukan koleksi batik tulis dan cap premium khas Malang dari Batik Celaket. Motif Sekar Jagad, Mega Mendung, Parang, dan Kawung berkualitas tinggi.",
};

import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#faf7f2] text-[#2C1E1A] selection:bg-[#C5A059]/30 selection:text-[#2C1E1A]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}


