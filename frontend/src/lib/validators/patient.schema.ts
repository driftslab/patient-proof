import { z } from "zod";

export const PatientRegisterSchema = z.object({
  stellarAddress: z
    .string()
    .length(56, "Stellar addresses must be exactly 56 characters.")
    .refine((val) => val.startsWith("G"), "Patient address must start with 'G' (public key)"),
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters.")
    .optional(),
});

export const PatientProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
});
