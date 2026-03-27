"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function ProductImageGallery({ images, name }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="space-y-3">
        <div className="aspect-square overflow-hidden bg-surface">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-text-muted/20">
              Product Image
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square overflow-hidden transition-opacity duration-300 hover:opacity-80 cursor-pointer ${
                i === activeIndex ? "ring-1 ring-accent" : "bg-surface-light"
              }`}
            >
              <Image
                src={src}
                alt={`${name} ${i + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
