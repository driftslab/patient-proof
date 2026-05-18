import { z } from "zod";
import { RecordType } from "@/types/medical";

export const RecordTypeSchema = z.nativeEnum(RecordType);

export const RecordCreateSchema = z.object({
  patientAddress: z
    .string()
    .length(56, "Stellar addresses must be exactly 56 characters.")
    .refine((val) => val.startsWith("G"), "Patient address must start with 'G' (public key)"),
  recordType: RecordTypeSchema,
  diagnosis: z
    .string()
    .min(3, "Diagnosis must be at least 3 characters.")
    .max(5000, "Diagnosis text cannot exceed 5000 characters."),
  notes: z.string().max(10000, "Notes cannot exceed 10000 characters.").optional(),
  medications: z.string().max(2000, "Medications cannot exceed 2000 characters.").optional(),
});

export const RecordAmendSchema = z.object({
  originalSeq: z.number().int().positive("Original sequence number must be positive."),
  reason: z
    .string()
    .min(10, "Amendment reason must explain the adjustment (min 10 characters).")
    .max(1000, "Amendment reason cannot exceed 1000 characters."),
  content: z
    .string()
    .min(3, "New diagnosis description must be provided.")
    .max(5000, "New diagnosis description cannot exceed 5000 characters."),
});
