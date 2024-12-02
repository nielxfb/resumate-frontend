
import { z } from 'zod';
import { cvSchema } from './cv-schema';

export const resultSchema = z.object({
  id: z.number().int().optional(), 
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected yyyy-mm-dd)").optional().default(() => new Date().toISOString().split('T')[0]),
  cvs: z.number(),
});

export type Result = z.infer<typeof resultSchema>;
