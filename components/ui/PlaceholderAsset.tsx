"use client";

import { cn } from "@/lib/cn";

interface PlaceholderAssetProps {
  label: string;
  aspectRatio?: string;
  className?: string;
  note?: string;
}

/**
 * Placeholder component for missing visual assets.
 * Replace by swapping in a real <Image /> or <video /> element.
 * All instances are clearly labelled with the expected asset type.
 */
export default function PlaceholderAsset({
  label,
  aspectRatio = "16/9",
  className,
  note,
}: PlaceholderAssetProps) {
  return (
    <div
      className={cn("asset-placeholder rounded-sm", className)}
      style={{ aspectRatio }}
      aria-label={`Placeholder: ${label}`}
    >
      {/* Gold diamond accent */}
      <div
        className="w-6 h-6 border border-[var(--gold-mid)] rotate-45 opacity-40"
        aria-hidden="true"
      />
      <span className="text-[var(--gold-mid)] opacity-60 text-xs tracking-widest uppercase">
        {label}
      </span>
      {note && (
        <span className="text-xs opacity-40 max-w-[200px] text-center leading-relaxed">
          {note}
        </span>
      )}
    </div>
  );
}
