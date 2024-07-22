import { z } from "zod";

export const subscriptionSchema = z.object({
  SubscriptionStatus: z
    .string()
    .min(1, { message: "Subscription status is required" }),
});

export type TSubscriptionSchema = z.infer<typeof subscriptionSchema>;
