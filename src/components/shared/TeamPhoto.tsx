"use client";

import { useState } from "react";

interface TeamPhotoProps {
  src: string;
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

/** Shows the photo if it loads; falls back to a teal initial avatar. */
export default function TeamPhoto({ src, name, style, className }: TeamPhotoProps) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (failed) {
    const size = (style?.width as number) ?? 160;
    return (
      <div
        className="flex items-center justify-center rounded-full mx-auto font-extrabold text-white select-none"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
          fontSize: size * 0.35,
          marginTop: style?.marginTop ?? 20,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      style={style}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
