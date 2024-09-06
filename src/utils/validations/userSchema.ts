import { z } from "zod";

export const userSchema = z
  .object({
    LastName: z.string().min(1, { message: "Last name is required" }),
    FirstName: z.string().min(1, { message: "First name is required" }),
    MiddleName: z.string().min(1, { message: "Middle name is required" }),
    Age: z.string().min(1, { message: "Age is required" }),
    Gender: z.string().min(1, { message: "Gender is required" }),
    ContactNumber: z
      .string()
      .min(1, { message: "Contact number is required" })
      .max(11, {
        message: "Contact number should not be more than 11 numbers",
      }),
    Birthday: z.string().min(1, { message: "Birthday is required" }),
    Email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    Address: z.string().min(1, { message: "Address is required" }),
    Height: z.string().min(1, { message: "Height is required" }),
    Weight: z.string().min(1, { message: "Weight is required" }),
    Username: z
      .string()
      .min(1, { message: "Username is required" })
      .min(5, { message: "Username should not be less than 5 letters" }),
    Password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(5, { message: "Password should not be less than 5 letters" }),
    ConfirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    ProfilePic: z.string().optional(),
    SubscriptionType: z
      .string()
      .min(1, { message: "Subscription type is required" }),
    RFIDNumber: z
      .string()
      .max(10, { message: "RFID number only max at 10 digits." })
      .optional(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Password do not match",
    path: ["ConfirmPassword"],
  });

export const otpSchema = z.object({
  OTPCode: z
    .string()
    .min(1, { message: "OTP is required" })
    .max(6, { message: "OTP code should not be more than 6 numbers" }),
});
export type TOtpSchema = z.infer<typeof otpSchema>;
export type TUserSchema = z.infer<typeof userSchema>;
