export const siteConfig = {
  name: "VaultMedic",
  description: "High-integrity, tamper-proof medical records registry powered by Stellar/Soroban smart contracts.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/vaultmedic/vaultmedic-protocol",
    stellar: "https://stellar.org",
  },
  theme: {
    background: "#04060c", // Swiss editorial abyss
    primary: "#3b82f6",    // Stellar blue
    success: "#10b981",    // Verified medical green
    warning: "#f59e0b",    // Warning amber
    danger: "#ef4444",     // Critical alert red
  },
};
export type SiteConfig = typeof siteConfig;
