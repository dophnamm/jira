import { ETaskStatus } from "@/models";

export const mappingRoute = {
  "/sign-up": "Sign Up",
  "/sign-in": "Login",
};

export const params = {
  createWorkspace: "create-workspace",
  createProject: "create-project",
  createTask: "create-task",
};

export const StatusMapping: { [key in ETaskStatus]: string } = {
  BACKLOG: "Backlog",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In review",
  TODO: "Todo",
};
