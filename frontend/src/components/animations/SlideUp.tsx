"use client";

import React from "react";
import { motion } from "framer-motion";

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  className = "",
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export default SlideUp;
