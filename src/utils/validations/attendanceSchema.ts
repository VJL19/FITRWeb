import { z } from "zod";

export const editAttendanceSchema = z.object({
  TimeIn: z.object({
    $d: z.date(),
  }),
  TimeOut: z.object({
    $d: z.date(),
  }),
});

export const createAttendanceSchema = z.object({
  LastName: z.string().min(1, { message: "Last name is required" }),
  FirstName: z.string().min(1, { message: "first name is required" }),
  SubscriptionType: z
    .string()
    .min(1, { message: "Subscription type is required" }),
  TimeIn: z.object({
    $d: z.date(),
  }),
  TimeOut: z.object({
    $d: z.date(),
  }),
  DateTapped: z.string().min(1, { message: "Date tapped is required" }),
});
export type TEditAttendanceSchema = z.infer<typeof editAttendanceSchema>;

export type TCreateAttendanceSchema = z.infer<typeof createAttendanceSchema>;
