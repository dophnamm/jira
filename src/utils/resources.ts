export const API_BASE = "/api";

// Auth
export const LOGIN_API = "/login";
export const REGISTER_API = "/register";
export const LOGOUT_API = "/logout";
export const CURRENT_USER_API = "/current-user";

// Workspaces
export const WORKSPACES_API = "/workspaces";
export const WORKSPACES_DETAIL_API = "/workspaces/:id";
export const WORKSPACES_RESET_INVITE_CODE_API =
  "/workspaces/:id/reset-invite-code";
export const WORKSPACES_JOIN = "/workspaces/:id/join";

// Invite URL
export const WORKSPACE_INVITE_URL = "/workspaces/:id/join/:inviteCode";

export const routes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  tasks: "/tasks",
  settings: "/settings",
  members: "/members",
  workspaces: "/workspaces",
  workspaceDetail: "/workspaces/:id",
};
