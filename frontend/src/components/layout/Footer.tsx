import React from "react";
import Link from "next/link";
import { Shield, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-[#04060c] py-12 text-sm mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-stellar-blue" />
            <span className="font-sans font-bold tracking-tight text-base">
              VAULT<span className="text-stellar-blue">MEDIC</span>
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
            Tamper-proof medical record index registry built on the Stellar Soroban blockchain network.
          </p>
        </div>

        {/* Resources */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-xs">Resources</h4>
          <Link href="/explorer" className="text-muted-foreground hover:text-foreground transition-colors">
            Blockchain Explorer
          </Link>
          <a href="https://stellar.org" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            Stellar Network
          </a>
        </div>

        {/* Portals */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-xs">Portals</h4>
          <Link href="/patient" className="text-muted-foreground hover:text-foreground transition-colors">
            Patient Dashboard
          </Link>
          <Link href="/provider" className="text-muted-foreground hover:text-foreground transition-colors">
            Provider Dashboard
          </Link>
        </div>

        {/* Legal / Social */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-xs">Repository</h4>
          <a
            href="https://github.com/vaultmedic/vaultmedic-protocol"
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub Repository
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-border/40 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} VaultMedic Protocol. All rights reserved.</p>
        <p className="flex items-center mt-2 md:mt-0">
          Crafted with <Heart className="mx-1 h-3.5 w-3.5 text-red-500 fill-red-500" /> for the Stellar Wave Program
        </p>
      </div>
    </footer>
  );
}
export default Footer;
