import { z } from 'zod';

export const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}).nullable();

export type Organization = z.infer<typeof organizationSchema>

export const organizationListSchema = z.array(organizationSchema)