import React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import "@/styles/animations.css";

export const metadata: Metadata = {
  title: "VaultMedic | Tamper-Proof Medical Records Registry",
  description: "High-integrity, decentralized medical audit log powered by Stellar/Soroban smart contracts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
