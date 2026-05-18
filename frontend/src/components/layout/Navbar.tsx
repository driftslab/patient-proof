"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Wallet, Activity, Key, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { formatAddress } from "@/lib/utils/format";
import { isAllowed, requestAccess } from "@stellar/freighter-api";

export function Navbar() {
  const pathname = usePathname();
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if Freighter is already connected
  useEffect(() => {
    async function checkConnection() {
      try {
        const hasAccess = await isAllowed();
        if (hasAccess) {
          const { getAddress } = await import("@stellar/freighter-api");
          const addr = await getAddress();
          if (addr && addr.address) setAddress(addr.address);
        }
      } catch (e) {
        console.warn("Freighter API connection check failed.");
      }
    }
    checkConnection();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const allowed = await requestAccess();
      if (allowed) {
        const { getAddress } = await import("@stellar/freighter-api");
        const addr = await getAddress();
        if (addr && addr.address) setAddress(addr.address);
      }
    } catch (e: any) {
      alert(e.message || "Failed to connect Freighter Wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border glassmorphism shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Left Side: Brand and Desktop Links */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2 text-foreground hover:opacity-90">
            <Shield className="h-6 w-6 text-stellar-blue glow-text-stellar" />
            <span className="font-sans font-bold tracking-tight text-lg">
              VAULT<span className="text-stellar-blue">MEDIC</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            <Link
              href="/explorer"
              className={`transition-colors hover:text-foreground ${
                pathname.startsWith("/explorer") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Explorer
            </Link>
            <Link
              href="/patient"
              className={`transition-colors hover:text-foreground ${
                pathname.startsWith("/patient") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Patient Portal
            </Link>
            <Link
              href="/provider"
              className={`transition-colors hover:text-foreground ${
                pathname.startsWith("/provider") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Provider Portal
            </Link>
          </nav>
        </div>

        {/* Right Side: Wallet connect & Hamburger toggles */}
        <div className="flex items-center space-x-4">
          {address ? (
            <div className="flex items-center space-x-2 bg-slate-950/40 border border-border p-1 rounded-lg">
              <Avatar address={address} size="sm" />
              <span className="hidden sm:inline text-xs font-mono font-semibold px-2 text-muted-foreground">
                {formatAddress(address, 5)}
              </span>
              <button
                onClick={disconnectWallet}
                className="p-1 text-muted-foreground hover:text-red-400 transition-colors cursor-pointer"
                title="Disconnect"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={connectWallet}
              disabled={isConnecting}
              className="border-blue-500/30 text-stellar-blue hover:bg-blue-950/10"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          )}

          {/* Hamburger Mobile Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-lg border border-border/40 hover:bg-slate-900/30"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-slate-950/95 backdrop-blur-md px-6 py-4 flex flex-col space-y-4 animate-fade-in shadow-xl">
          <Link
            href="/explorer"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`transition-colors hover:text-foreground block py-1.5 text-sm font-semibold ${
              pathname.startsWith("/explorer") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Explorer
          </Link>
          <Link
            href="/patient"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`transition-colors hover:text-foreground block py-1.5 text-sm font-semibold ${
              pathname.startsWith("/patient") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Patient Portal
          </Link>
          <Link
            href="/provider"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`transition-colors hover:text-foreground block py-1.5 text-sm font-semibold ${
              pathname.startsWith("/provider") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Provider Portal
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
