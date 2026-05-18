"use client";

import React from "react";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className = "" }: GridBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden bg-[#04060c] ${className}`}>
      {/* Ambience Radial Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-950/10 blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-950/5 blur-[150px]" />
      <div className="absolute top-[30%] right-[20%] h-[500px] w-[500px] rounded-full bg-blue-900/5 blur-[180px]" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]" 
      />
    </div>
  );
}
export default GridBackground;
