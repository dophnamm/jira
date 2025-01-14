import { cookies } from "next/headers";
import { Account, Client, Databases, Models, Query } from "node-appwrite";

import { IMember, IWorkspaces } from "@/models";

import { AUTH_COOKIES } from "@/features/auth/utils/constants";

import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  DATABASE_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";

export const getWorkspaces = async () => {
  const defaultValues = {
    documents: [],
    total: 0,
  } as Models.DocumentList<Models.Document>;

  try {
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT);

    const session = await cookies().get(AUTH_COOKIES);

    if (!session) return defaultValues;

    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);
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
    )) as Models.DocumentList<Models.Document & IWorkspaces>;

    return workspaces;
  } catch {
    return defaultValues;
  }
};
