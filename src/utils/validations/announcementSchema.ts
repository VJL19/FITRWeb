import { z } from "zod";

export const announcementSchema = z.object({
  AnnouncementTitle: z
    .string()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title should not be less than 5 letters" }),
  AnnouncementDescription: z
    .string()
    .min(1, { message: "Description is required" })
    .min(5, { message: "Description should not be less than 5 letters" }),
});

export type TannouncementSchema = z.infer<typeof announcementSchema>;
