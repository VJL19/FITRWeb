import { z } from "zod";

export const filterGenerateByDateSchema = z.object({
  reportType: z.string().min(1, { message: "Type of report is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
});
export type TGenerateSchema = z.infer<typeof filterGenerateByDateSchema>;
