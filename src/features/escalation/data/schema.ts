import { z } from 'zod';

import { groupSchema } from '@/features/groups/data/schema';
import { organizationSchema } from '@/features/organizations/data/schema';

const userStatusSchema = z
  .boolean()
  .transform((val) => (val ? 'active' : 'inactive')); // Transform boolean to string
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('viewer'),
  z.literal('reviewer'),
  z.literal('executor'),
  z.literal('admin'),
]);

export const userSchema = z.object({
  id: z.string(),
  microsoftEntraId: z.string(),
  username: z.string(),
  fullName: z.string(),
  email: z.string(),
  role: userRoleSchema,
  groupId: z.string().nullable(),
  organizationId: z.string().nullable(),
  department: z.string(),
  inviterId: z.string().nullable(),
  isActive: userStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userGroup: groupSchema,
  userOrgnanization: organizationSchema,
});

export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
