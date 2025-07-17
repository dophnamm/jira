import { z } from "zod";

export const QueryProjects = z.object({ workspaceId: z.string() });

export interface IProject {
  $id: string;
  workspaceId: string;
  name: string;
  imageUrl: string;
}

export const CreateProjectSchema = z.object({
  name: z.string().trim().min(1, "Invalid name"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
});

export type TCreateProjectSchema = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = z.object({
  name: z.string().trim().min(1, "Invalid name").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
});

export type TUpdateProjectSchema = z.infer<typeof UpdateProjectSchema>;
