import { Models, Query } from "node-appwrite";

import { IMember, IWorkspace } from "@/models";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "../members/utils/functions";

export const getWorkspaces = async () => {
  const defaultValues = {
    documents: [],
    total: 0,
  } as Models.DocumentList<Models.Document>;

  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();

    const members = (await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ])) as Models.DocumentList<Models.Document & IMember>;

    if (members.total === 0) {
      return defaultValues;
    }

    const workspaceIds = members.documents.map((m) => m.workspaceId);

    const workspaces = (await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.contains("$id", workspaceIds), Query.orderDesc("$createdAt")]
    )) as Models.DocumentList<Models.Document & IWorkspace>;

    return workspaces;
  } catch {
    return defaultValues;
  }
};

export const getWorkspace = async (id: string) => {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();

    const member = await getMember({
      databases,
      workspaceId: id,
      userId: user.$id,
    });

    if (!member) return null;

    const workspace = (await databases.getDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      id
    )) as Models.Document & IWorkspace;

    return workspace;
  } catch {
    return null;
  }
};
