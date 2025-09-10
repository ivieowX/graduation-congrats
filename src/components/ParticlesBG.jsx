import React from "react";

export default function ParticlesBG() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,.15) 0 20%, transparent 21%),
radial-gradient(circle at 80% 30%, rgba(255,255,255,.12) 0 16%, transparent 17%),
radial-gradient(circle at 50% 80%, rgba(255,255,255,.10) 0 14%, transparent 15%)`,
      }}
    />
  );
}
