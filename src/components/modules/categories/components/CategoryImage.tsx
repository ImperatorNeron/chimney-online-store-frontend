// components/categories/CategoryImage.tsx
"use client";

import Image from "next/image";

interface CategoryImageProps {
  imageSrc: string;
  alt: string;
  size?: number;
  className?: string;
}

export function CategoryImage({
  imageSrc,
  alt,
  size = 56,
  className = "",
}: CategoryImageProps) {

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl bg-zinc-100 ${className}`}
      style={{ width: size, height: size }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-zinc-200 to-zinc-100" />
      )}
    </div>
  );
}