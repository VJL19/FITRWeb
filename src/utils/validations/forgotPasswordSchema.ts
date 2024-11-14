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
      .min(8)
      .regex(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
        {
          message:
            "Your password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
        }
      ),
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
