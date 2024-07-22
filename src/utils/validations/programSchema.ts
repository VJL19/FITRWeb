import { z } from "zod";

export const programSchema = z.object({
  SuggestedProgramTitle: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title should not be less than 5 letters" }),
  SuggestedProgramDescription: z
    .string()
    .min(1, { message: "Description is required" })
    .min(5, { message: "Description should not be less than 5 letters" }),
});

export type TProgramSchema = z.infer<typeof programSchema>;
