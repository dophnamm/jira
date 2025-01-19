import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Invalid name"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export type TCreateWorkspacesSchema = z.infer<typeof CreateWorkspaceSchema>;

export const UpdateWorkspaceSchema = CreateWorkspaceSchema;

export type TUpdateWorkspacesSchema = z.infer<typeof UpdateWorkspaceSchema>;

export interface IWorkspace {
  name: string;
  userId: string;
  imageUrl?: string;
  inviteCode: string;
}
