import { z } from "zod";

export const exampleDataSchema = z.object({
  invoice_id: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected yyyy-mm-dd)"),
  amount_purchase: z.number(),
  payment_status: z.enum(["Paid", "Pending", "Failed"]),
  payment_method: z.enum(["Credit Card", "Bank Transfer", "PayPal", "Debit Card"]),
  token_amount: z.number()
});

export type exampleData = z.infer<typeof exampleDataSchema>;
