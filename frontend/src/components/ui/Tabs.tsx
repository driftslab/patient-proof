"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (val: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

export function Tabs({ defaultValue, children, className = "" }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex space-x-1 rounded-lg bg-slate-950/60 p-1 border border-border", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer select-none",
        isActive 
          ? "bg-stellar-blue text-white shadow-md shadow-blue-500/10" 
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: { value: string; children: React.ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");

  const isActive = context.activeTab === value;

  if (!isActive) return null;

  return (
    <div className={cn("mt-4 focus-visible:outline-none", className)}>
      {children}
    </div>
  );
}
export default Tabs;
