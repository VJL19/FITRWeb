import { z } from "zod";

export const emailSchema = z.object({
  Email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});
export const otpSchema = z.object({
  OTPCode: z
    .string()
    .min(1, { message: "Age is required" })
    .min(6, { message: "Entered OTP cannot be less than 6 digit" }),
});

export const forgotPasswordSchema = z
  .object({
    Password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(5, { message: "Password should not be less than 5 letters" }),
    ConfirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Password do not match",
    path: ["ConfirmPassword"],
  });

export type TEmailSchema = z.infer<typeof emailSchema>;
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TOTPSchema = z.infer<typeof otpSchema>;
