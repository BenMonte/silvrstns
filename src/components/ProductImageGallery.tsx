"use client";

type Props = {
  images: string[];
  name: string;
};

export default function ProductImageGallery({ name }: Props) {
  return (
    <div className="space-y-3">
      <div className="aspect-square overflow-hidden bg-surface">
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-text-muted/20">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}
