import { z } from "zod";

export enum EMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface IMember {
  userId: string;
  workspaceId: string;
  role: EMemberRole;
  name: string;
  email: string;
}

export const QueryMembers = z.object({ workspaceId: z.string() });

export type TQueryMembers = z.infer<typeof QueryMembers>;

export const UpdateMemberRoleSchema = z.object({
  role: z.nativeEnum(EMemberRole),
});

export type TUpdateMemberRole = z.infer<typeof UpdateMemberRoleSchema>;
