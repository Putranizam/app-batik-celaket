"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, ClipboardList, Info } from "lucide-react";

const navItems = [
  { href: "/beranda", label: "Beranda", icon: Home },
  { href: "/produk", label: "Produk", icon: ShoppingBag },
  { href: "/keranjang", label: "Keranjang", icon: ShoppingCart },
  { href: "/pesanan", label: "Pesanan", icon: ClipboardList },
  { href: "/tentang", label: "Tentang Kami", icon: Info },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#ece2d3] z-50">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href === "/beranda" && pathname === "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-0 px-1 py-1 group"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`transition-colors duration-200 ${
                  isActive ? "text-[#c5a059]" : "text-[#8a7060]"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors duration-200 leading-tight text-center ${
                  isActive ? "text-[#c5a059]" : "text-[#8a7060]"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
