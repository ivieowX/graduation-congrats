import React from "react";

export default function FloatingShapes() {
  // ใช้ utility classes ของ Tailwind ทำ float แบบง่าย ๆ
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute -top-10 left-8 h-24 w-24 animate-bounce rounded-2xl bg-white/20"></div>
      <div className="absolute bottom-10 right-10 h-32 w-32 animate-pulse rounded-full bg-white/10"></div>
      <div className="absolute top-1/2 left-4 h-16 w-16 animate-[float_6s_ease-in-out_infinite] rounded-3xl bg-white/10"></div>
      <style>
        {`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)}}`}
      </style>
    </div>
  );
}
