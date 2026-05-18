"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { GridBackground } from "@/components/animations/GridBackground";
import { SlideUp } from "@/components/animations/SlideUp";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { AuditAnimation } from "@/components/animations/AuditAnimation";
import { CountUp } from "@/components/animations/CountUp";
import { HashScramble } from "@/components/animations/HashScramble";
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Activity, 
  UserCheck, 
  ChevronRight, 
  Clock, 
  RefreshCcw, 
  Eye, 
  CheckCircle2, 
  ServerCrash
} from "lucide-react";
import { formatAddress } from "@/lib/utils/format";

// Mock Scrolling Audit Log Events to represent live ledger streams
interface MockEvent {
  id: string;
  patient: string;
  type: string;
  cid: string;
  ledger: number;
  status: "success" | "warning" | "danger" | "idle";
  txHash: string;
}

const INITIAL_MOCK_EVENTS: MockEvent[] = [
  {
    id: "evt_1",
    patient: "GD3J76...492A",
    type: "RECORD_CREATED",
    cid: "bafybeicr5...d201a",
    ledger: 5124803,
    status: "success",
    txHash: "a1b2c3d4e5...f6a7",
  },
  {
    id: "evt_2",
    patient: "GBK42M...301B",
    type: "ACCESS_GRANTED",
    cid: "provider_access",
    ledger: 5124805,
    status: "success",
    txHash: "8c9d0e1f2a...3b4c",
  },
  {
    id: "evt_3",
    patient: "GD3J76...492A",
    type: "RECORD_AMENDED",
    cid: "bafybeicr5...f102b",
    ledger: 5124812,
    status: "warning",
    txHash: "4d5e6f7a8b...9c0d",
  },
  {
    id: "evt_4",
    patient: "GA5W2L...904X",
    type: "PATIENT_REGISTERED",
    cid: "profile_hash",
    ledger: 5124818,
    status: "success",
    txHash: "e1f2a3b4c5...d6e7",
  },
];

export function Page() {
  const [events, setEvents] = useState<MockEvent[]>(INITIAL_MOCK_EVENTS);
  const [activeAudit, setActiveAudit] = useState<MockEvent | null>(INITIAL_MOCK_EVENTS[0]);
  const [auditProgress, setAuditProgress] = useState(100);

  // Simulate real-time ledger events ticking in
  useEffect(() => {
    const interval = setInterval(() => {
      const patientKeys = ["GD3J76...492A", "GBK42M...301B", "GA5W2L...904X", "GC7V9S...112Z"];
      const types = ["RECORD_CREATED", "RECORD_AMENDED", "ACCESS_GRANTED", "ACCESS_REVOKED"];
      const statuses = ["success", "warning", "success", "danger"] as const;

      const randomPatient = patientKeys[Math.floor(Math.random() * patientKeys.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomIndex = Math.floor(Math.random() * types.length);
      const randomStatus = statuses[randomIndex];
      const randomLedger = events[0].ledger + Math.floor(Math.random() * 3) + 1;
      
      const newEvent: MockEvent = {
        id: `evt_${Date.now()}`,
        patient: randomPatient,
        type: randomType,
        cid: randomType.includes("RECORD") ? `bafybeicr5...${Math.random().toString(36).substring(2, 7)}` : "metadata_cid",
        ledger: randomLedger,
        status: randomStatus,
        txHash: Math.random().toString(16).substring(2, 12) + "..." + Math.random().toString(16).substring(2, 6),
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 5)]);
      setActiveAudit(newEvent);
      setAuditProgress(0);
    }, 8000); // Trigger event every 8 seconds

    return () => clearInterval(interval);
  }, [events]);

  // Smoothly increment audit scan bar progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setAuditProgress((prev) => Math.min(100, prev + 1.25));
    }, 100);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <GridBackground />
      <Navbar />

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center z-10">
        <SlideUp delay={0.1}>
          <Badge variant="info" className="mb-4 bg-blue-950/15 border-blue-500/20 text-stellar-blue px-3 py-1 text-xs">
            Stellar Wave Program Feature Project
          </Badge>
        </SlideUp>

        <SlideUp delay={0.2}>
          <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight leading-none text-foreground max-w-4xl">
            Tamper-Proof Medical Auditing
            <span className="block mt-2 bg-gradient-to-r from-stellar-blue to-emerald-400 bg-clip-text text-transparent glow-text-stellar">
              Powered by Soroban
            </span>
          </h1>
        </SlideUp>

        <SlideUp delay={0.3}>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            VaultMedic secures clinical registries on-chain. Patients control cryptographic access delegations
            while providers verify record indexes without exposing sensitive health data.
          </p>
        </SlideUp>

        <SlideUp delay={0.4}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/patient">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Patient Portal
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/provider">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-border bg-slate-950/40 text-foreground hover:bg-slate-900">
                Provider Login
              </Button>
            </Link>
            <Link href="/explorer">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-muted-foreground hover:text-foreground">
                Browse Audits Log
              </Button>
            </Link>
          </div>
        </SlideUp>
      </section>

      {/* ─── DYNAMIC STATISTICS SECTION ────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-12 z-10">
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="text-center p-6 border-border bg-slate-950/30">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stellar-blue">
                <CountUp end={5124818} duration={1.5} />
              </div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mt-1">Verified Ledgers</div>
            </Card>
            <Card className="text-center p-6 border-border bg-slate-950/30">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                <CountUp end={8204} duration={1.5} />
              </div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mt-1">Secure Indexes</div>
            </Card>
            <Card className="text-center p-6 border-border bg-slate-950/30">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-500">
                <CountUp end={3412} duration={1.5} />
              </div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mt-1">Access Grants</div>
            </Card>
            <Card className="text-center p-6 border-border bg-slate-950/30">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground">
                5.2s
              </div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mt-1">Block Latency</div>
            </Card>
          </div>
        </FadeIn>
      </section>

      {/* ─── CENTERPIECE: LIVE AUDIT PANEL ─────────────────────────────────── */}
      <section className="container mx-auto px-6 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Audit Verification Terminal */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <SlideUp>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-stellar-blue animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight">Live Cryptographic Audit Terminal</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Every event on VaultMedic is cryptographically verified. Watch transactions compile, fetch symmetric CIDs,
                and assert temporal access permissions in real-time.
              </p>
            </SlideUp>

            <SlideUp delay={0.1}>
              <div className="rounded-xl border border-border bg-slate-950/70 p-5 shadow-2xl relative overflow-hidden">
                {/* Header info */}
                <div className="flex justify-between items-center pb-3 border-b border-border/80 text-xs">
                  <span className="font-mono text-muted-foreground">Verification Node: testnet-node-1</span>
                  <div className="flex items-center text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping mr-1.5" />
                    Live Monitoring Active
                  </div>
                </div>

                {/* Audit state animation and metrics */}
                {activeAudit && (
                  <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      <AuditAnimation status={activeAudit.status} />
                      <div>
                        <div className="text-xs text-muted-foreground font-mono">ASSERTING PHI INTEGRITY</div>
                        <div className="text-sm font-semibold mt-0.5">{activeAudit.type.replace(/_/g, " ")}</div>
                        <div className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center">
                          Patient: <span className="text-foreground ml-1">{activeAudit.patient}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-48 bg-slate-900/80 border border-border p-3 rounded-lg text-[10px] font-mono flex flex-col space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ledger:</span>
                        <span className="text-foreground font-semibold">#{activeAudit.ledger}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IPFS CID:</span>
                        <span className="text-stellar-blue font-semibold">{activeAudit.cid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tx Hash:</span>
                        <span className="text-foreground font-semibold">{activeAudit.txHash}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audit progress bar */}
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-stellar-blue h-full transition-all duration-100 ease-linear"
                    style={{ width: `${auditProgress}%` }}
                  />
                </div>

                {/* Terminal outputs */}
                <div className="bg-[#04060c] rounded-lg p-3 border border-border/60 text-[10px] font-mono text-muted-foreground leading-relaxed flex flex-col space-y-1">
                  <div className="flex items-center text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Assertion success: Soroban RPC checks completed.
                  </div>
                  <div>&gt; [RPC] check_access called for provider signature... VALID.</div>
                  <div>&gt; [IPFS] Fetching cryptographically encrypted PHI index metadata... DONE.</div>
                  <div>
                    &gt; Verified SHA-256 Hash matches Ledger:{" "}
                    <span className="text-stellar-blue">
                      <HashScramble text={activeAudit ? activeAudit.txHash.replace(/\./g, "") : "a1b2c3d4e5f6"} speed={40} />
                    </span>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Ledger Live Feed Ticker */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <SlideUp delay={0.2}>
              <Card className="p-4 border-border bg-slate-950/40 relative overflow-hidden flex flex-col h-[400px]">
                <div className="flex items-center justify-between pb-3 border-b border-border/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">Ledger Activity Feed</span>
                  <Badge variant="default" className="text-[10px] bg-slate-900 border-border">Latest 5 events</Badge>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 py-2 flex flex-col space-y-3">
                  {events.map((evt) => {
                    const badgeVariants = {
                      success: "success",
                      warning: "warning",
                      danger: "danger",
                      idle: "default",
                    } as const;

                    return (
                      <div 
                        key={evt.id}
                        onClick={() => {
                          setActiveAudit(evt);
                          setAuditProgress(100);
                        }}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer flex justify-between items-center ${
                          activeAudit?.id === evt.id 
                            ? "bg-slate-900/60 border-stellar-blue/40 shadow-md shadow-blue-500/5" 
                            : "bg-slate-950/20 border-border/40 hover:border-border hover:bg-slate-900/20"
                        }`}
                      >
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs font-bold text-foreground">{evt.type.replace(/_/g, " ")}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">Patient: {evt.patient}</span>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge variant={badgeVariants[evt.status]}>{evt.status.toUpperCase()}</Badge>
                          <span className="text-[9px] font-mono text-muted-foreground">Ledger #{evt.ledger}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ─── SECURE CRYPTOGRAPHIC PRINCIPLES SECTION ──────────────────────── */}
      <section className="container mx-auto px-6 py-16 z-10 border-t border-border/40">
        <SlideUp>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Decentralized Zero-PHI Architecture</h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Patient diagnoses, prescriptions, and health details are highly sensitive.
              VaultMedic employs a split-security framework to guarantee absolute patient privacy.
            </p>
          </div>
        </SlideUp>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-border bg-slate-950/20">
            <div className="p-3 bg-blue-950/30 border border-blue-500/20 text-stellar-blue rounded-lg inline-block">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold mt-4">1. Browser AES Encryption</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Symmetric AES-256-GCM encryption occurs in the client browser (Web Crypto API) before upload.
              No raw PHI text is ever transmitted.
            </p>
          </Card>

          <Card className="p-6 border-border bg-slate-950/20">
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 rounded-lg inline-block">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold mt-4">2. Decentered IPFS Upload</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              The encrypted cipher text and keys are committed to IPFS. The server only proxies gateway fetches,
              ensuring patient custody.
            </p>
          </Card>

          <Card className="p-6 border-border bg-slate-950/20">
            <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 rounded-lg inline-block">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold mt-4">3. Soroban Access Control</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Only the cryptographic SHA-256 hash and IPFS CID are committed to Soroban.
              The smart contracts guard access keys, blocking unauthorized reads.
            </p>
          </Card>
        </StaggerChildren>
      </section>

      <Footer />
    </div>
  );
}

export default Page;
