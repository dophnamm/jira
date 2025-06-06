import { z } from "zod";

import { IProject } from "./projects";
import { IMember } from "./members";

export enum ETaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export const CreateTaskSchema = z.object({
  name: z.string().min(1, "Name invalid"),
  status: z.nativeEnum(ETaskStatus, { required_error: "Status invalid" }),
  workspaceId: z.string().trim().min(1, "Workspace ID invalid"),
  projectId: z.string().trim().min(1, "Project ID invalid"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Assignee ID invalid"),
  description: z.string().optional(),
});

export type TCreateTaskSchema = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = CreateTaskSchema.partial();

export const QueryTasks = z.object({
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  assigneeId: z.string().nullish(),
  status: z.nativeEnum(ETaskStatus).nullish(),
  search: z.string().nullish(),
  dueDate: z.string().nullish(),
});

export const BulkTaskUpdate = z.object({
  tasks: z.array(
    z.object({
      $id: z.string(),
      status: z.nativeEnum(ETaskStatus),
      priority: z.number().int().positive().min(0).max(1_000_000),
    })
  ),
});

export type TBulkTaskUpdate = z.infer<typeof BulkTaskUpdate>;

export interface ITask {
  $id: string;
  name: string;
  status: ETaskStatus;
  workspaceId: string;
  projectId: string;
  assigneeId: string;
  dueDate: Date | string;
  description?: string;
  priority: number;
  project?: IProject;
  assignee?: IMember;
}
