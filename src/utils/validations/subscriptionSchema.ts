import { z } from "zod";

export const subscriptionSchema = z.object({
  SubscriptionStatus: z
    .string()
    .min(1, { message: "Subscription status is required" }),
});

export const createSubscriptionSchema = z.object({
  SubscriptionType: z
    .string()
    .min(1, { message: "Subscription type is required" }),
  SubscriptionAmount: z
    .string()
    .min(1, { message: "Subscription amountt is required" }),
  SubscriptionMethod: z
    .string()
    .min(1, { message: "Subscription method is required" }),
});
export type TSubscriptionSchema = z.infer<typeof subscriptionSchema>;

export type TCreateSubscriptionSchema = z.infer<
  typeof createSubscriptionSchema
>;
