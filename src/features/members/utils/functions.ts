import { Query, type Databases, type Models } from "node-appwrite";

import { IMember } from "@/models";

import { DATABASE_ID, MEMBERS_ID } from "@/config";

interface IGetMemberProps {
  databases: Databases;
  workspaceId: string;
  userId: string;
}

export const getMember = async (props: IGetMemberProps) => {
  const { databases, workspaceId, userId } = props;

  const members = (await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ])) as Models.DocumentList<Models.Document & IMember>;

  return members.documents[0];
};
