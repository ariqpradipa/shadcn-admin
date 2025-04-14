import { z } from 'zod';

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}).nullable();

export type Group = z.infer<typeof groupSchema>

export const groupListSchema = z.array(groupSchema)