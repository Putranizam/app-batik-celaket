import React from "react";

interface PageHeaderBannerProps {
  title: string;
  description: string;
}

export default function PageHeaderBanner({
  title,
  description,
}: PageHeaderBannerProps) {
  return (
    <div className="w-full bg-[#F3ECE0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E8DEC8]/80 shadow-[0_2px_8px_rgba(61,40,23,0.04)] mb-6">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D2817] tracking-tight">
        {title}
      </h1>
      <p className="font-sans text-sm sm:text-base text-[#6E543C] mt-1.5 font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
