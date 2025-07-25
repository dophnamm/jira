import { ETaskStatus } from "@/models";

export const mappingRoute = {
  "/sign-up": "Sign Up",
  "/sign-in": "Login",
};

export const params = {
  createWorkspace: "create-workspace",
  createProject: "create-project",
  createTask: "create-task",
  updateTask: "update-task",
  tabView: "tab-view",
};

export const statusMapping: { [key in ETaskStatus]: string } = {
  BACKLOG: "Backlog",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  TODO: "Todo",
};

export const dateFormat = {
  common: "DD/MM/YYYY",
  monthAndYear: "MMMM YYYY",
  dayOfWeek: "ddd",
};
