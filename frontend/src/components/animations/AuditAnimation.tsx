"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Fingerprint } from "lucide-react";

interface AuditAnimationProps {
  status?: "success" | "warning" | "danger" | "idle";
}

export function AuditAnimation({ status = "success" }: AuditAnimationProps) {
  const colorMap = {
    success: "border-emerald-500/50 bg-emerald-950/10 text-emerald-400 shadow-emerald-500/20",
    warning: "border-amber-500/50 bg-amber-950/10 text-amber-400 shadow-amber-500/20",
    danger: "border-red-500/50 bg-red-950/10 text-red-400 shadow-red-500/20",
    idle: "border-blue-500/50 bg-blue-950/10 text-blue-400 shadow-blue-500/20",
  };

  const getIcon = () => {
    switch (status) {
      case "success":
        return <ShieldCheck className="h-8 w-8" />;
      case "danger":
        return <ShieldAlert className="h-8 w-8" />;
      case "warning":
        return <ShieldAlert className="h-8 w-8 text-amber-400" />;
      default:
        return <Fingerprint className="h-8 w-8" />;
    }
  };

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      {/* Outer Pulse Rings */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute inset-0 rounded-full border-2 ${
          status === "success"
            ? "border-emerald-500/20"
            : status === "warning"
            ? "border-amber-500/20"
            : status === "danger"
            ? "border-red-500/20"
            : "border-blue-500/20"
        }`}
      />

      {/* Core verified sphere */}
      <div 
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 glassmorphism shadow-lg ${colorMap[status]} overflow-hidden`}
      >
        {getIcon()}

        {/* Laser scanner animation overlay */}
        <div className="laser-scanner-line" />
      </div>
    </div>
  );
}
export default AuditAnimation;
