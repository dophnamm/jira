import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Invalid name"),
});

export type TCreateWorkspacesSchema = z.infer<typeof CreateWorkspaceSchema>;
