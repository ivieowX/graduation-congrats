import React from "react";
import { Outlet } from "react-router-dom";
import ParticlesBG from "./components/ParticlesBG";
import FloatingShapes from "./components/FloatingShapes";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBG />
      <FloatingShapes />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
