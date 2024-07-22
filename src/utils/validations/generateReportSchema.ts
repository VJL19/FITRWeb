import { z } from "zod";

export const filterGenerateByDateSchema = z.object({
  reportType: z.string().min(1, { message: "type of report is required" }),
  selectedDate: z.string().min(1, { message: "selected date is required" }),
});
export type TGenerateSchema = z.infer<typeof filterGenerateByDateSchema>;
