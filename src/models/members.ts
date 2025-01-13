export enum EMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface IMember {
  userId: string;
  workspaceId: string;
  role: EMemberRole;
}
