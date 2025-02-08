import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "../members/utils/functions";
import { Models } from "node-appwrite";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { IProject } from "@/models";

export const getProject = async (id: string) => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const project = (await databases.getDocument(
    DATABASE_ID,
    PROJECTS_ID,
    id
  )) as Models.Document & IProject;

  const member = await getMember({
    databases,
    workspaceId: project.workspaceId,
    userId: user.$id,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  return project;
};
