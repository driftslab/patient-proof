"use client";

import React, { useEffect, useState } from "react";

interface HashScrambleProps {
  text: string;
  speed?: number; // interval timing in ms
}

export function HashScramble({ text, speed = 30 }: HashScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const chars = "abcdef0123456789";

  useEffect(() => {
    if (!text) return;
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            // Scramble characters using hex sets
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Scramble speed step ratio
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="font-mono tracking-tight">{displayText}</span>;
}
export default HashScramble;
