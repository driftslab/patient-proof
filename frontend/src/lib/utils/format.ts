import { VaultMedicEventType } from "@/types/stellar";

export function formatAddress(addr: string, chars: number = 6): string {
  if (!addr) return "";
  if (addr.length <= chars + 4) return addr;
  return `${addr.substring(0, chars)}...${addr.substring(addr.length - 4)}`;
}

export function formatContractId(id: string): string {
  return formatAddress(id, 6);
}

export function formatLedger(seq: number): string {
  return `Ledger #${seq.toLocaleString()}`;
}

export function formatTimestamp(ts: number | string): string {
  if (!ts) return "";
  const num = typeof ts === "string" ? parseInt(ts) : ts;
  // If timestamp is in seconds, convert to ms
  const date = new Date(num * 1000 < Date.now() / 10 ? num * 1000 : num);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatXlm(amount: string | number): string {
  if (amount === undefined || amount === null) return "0.00 XLM";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} XLM`;
}

export function truncateHash(hex: string, chars: number = 8): string {
  if (!hex) return "";
  if (hex.length <= chars + 6) return hex;
  return `${hex.substring(0, chars)}...${hex.substring(hex.length - 6)}`;
}

export function eventTypeToLabel(type: string | VaultMedicEventType): string {
  return type.replace(/_/g, " ");
}

export function eventTypeToColor(type: string | VaultMedicEventType): "default" | "success" | "warning" | "danger" | "info" {
  switch (type) {
    case VaultMedicEventType.RECORD_CREATED:
      return "success";
    case VaultMedicEventType.RECORD_AMENDED:
      return "warning";
    case VaultMedicEventType.ACCESS_GRANTED:
      return "info";
    case VaultMedicEventType.ACCESS_REVOKED:
      return "danger";
    case VaultMedicEventType.PATIENT_REGISTERED:
      return "default";
    case VaultMedicEventType.PROVIDER_VERIFIED:
      return "success";
    default:
      return "default";
  }
}
