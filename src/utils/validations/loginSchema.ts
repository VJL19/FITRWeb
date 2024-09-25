import { z } from "zod";

export const loginSchema = z.object({
  Username: z
    .string()
    .min(1, { message: "Username is required!" })
    .min(5, { message: "Username cannot be less than 5 characters" }),
  Password: z.string().min(1, { message: "Password is required!" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
