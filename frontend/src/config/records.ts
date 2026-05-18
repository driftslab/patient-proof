import { RecordType } from "@/types/medical";

export interface RecordTypeInfo {
  label: string;
  description: string;
  badgeColor: "default" | "success" | "warning" | "danger" | "info";
  iconName: "Stethoscope" | "Pills" | "Flask" | "FileText" | "ShieldAlert";
}

export const recordTypesConfig: Record<RecordType, RecordTypeInfo> = {
  [RecordType.DIAGNOSIS]: {
    label: "Clinical Diagnosis",
    description: "Physician observations, conditions, and diagnosed medical conditions.",
    badgeColor: "info",
    iconName: "Stethoscope",
  },
  [RecordType.PRESCRIPTION]: {
    label: "Medication Prescription",
    description: "Doctor orders, exact dosages, duration, and clinical dispensing instructions.",
    badgeColor: "success",
    iconName: "Pills",
  },
  [RecordType.LAB]: {
    label: "Laboratory & Imaging",
    description: "Biometric assays, blood counts, MRI/CT scans, and clinical panel results.",
    badgeColor: "warning",
    iconName: "Flask",
  },
  [RecordType.REFERRAL]: {
    label: "Clinical Referral",
    description: "Formal transitions of care, transfer notes, and specialist evaluations.",
    badgeColor: "default",
    iconName: "FileText",
  },
  [RecordType.DISCHARGE]: {
    label: "Discharge Summary",
    description: "Inpatient stay synopses, post-operation treatment plans, and emergency summaries.",
    badgeColor: "danger",
    iconName: "ShieldAlert",
  },
};
