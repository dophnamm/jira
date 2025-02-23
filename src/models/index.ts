export * from "./auth";
export * from "./workspaces";
export * from "./members";
export * from "./projects";
export * from "./tasks";

export interface IProjectOptions {
  id: string;
  name: string;
  imageUrl: string;
}

export interface IMemberOptions {
  id: string;
  name: string;
}
