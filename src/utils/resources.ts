export const API_BASE = "/api";

// Auth
export const LOGIN_API = "/login";
export const REGISTER_API = "/register";
export const LOGOUT_API = "/logout";
export const CURRENT_USER_API = "/current-user";

// Members
export const MEMBERS_API = "/members";
export const MEMBERS_DETAIL_API = "/members/:id";

// Workspaces
export const WORKSPACES_API = "/workspaces";
export const WORKSPACES_DETAIL_API = "/workspaces/:id";
export const WORKSPACES_RESET_INVITE_CODE_API =
  "/workspaces/:id/reset-invite-code";
export const WORKSPACES_JOIN = "/workspaces/:id/join";

// Projects
export const PROJECTS_API = "/projects";
export const PROJECTS_DETAIL_API = "/projects/:id";

// Tasks
export const TASKS_API = "/tasks";
export const TASKS_DETAIL_API = "tasks/:id";

export const routes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  tasks: "/tasks",
  taskDetail: "/workspaces/:workspaceId/tasks/:id",
  settings: "/settings",
  members: "/members",
  workspaces: "/workspaces",
  workspaceDetail: "/workspaces/:id",
  workspaceInviteCode: "/workspaces/:id/join/:inviteCode",
  projectDetail: "/workspaces/:workspaceId/projects/:projectId",
  projectDetailSettings:
    "/workspaces/:workspaceId/projects/:projectId/settings",
};
