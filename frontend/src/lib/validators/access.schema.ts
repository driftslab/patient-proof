import { z } from "zod";

export const AccessGrantSchema = z.object({
  patientAddress: z
    .string()
    .length(56, "Stellar addresses must be exactly 56 characters.")
    .refine((val) => val.startsWith("G"), "Patient address must start with 'G'"),
  providerAddress: z
    .string()
    .length(56, "Stellar addresses must be exactly 56 characters.")
    .refine((val) => val.startsWith("G"), "Provider address must start with 'G'"),
  scope: z.enum(["FULL", "READ_ONLY", "EMERGENCY"]),
  expiresAt: z
    .number()
    .int()
    .nonnegative("Expiry timestamp must be zero (no expiry) or positive.")
    .default(0),
});

export const AccessRevokeSchema = z.object({
  patientAddress: z
    .string()
    .length(56, "Stellar addresses must be exactly 56 characters.")
    .refine((val) => val.startsWith("G"), "Patient address must start with 'G'"),
  providerAddress: z
    .string()
    .length(56, "Stellar addresses must be exactly 56 characters.")
    .refine((val) => val.startsWith("G"), "Provider address must start with 'G'"),
});
