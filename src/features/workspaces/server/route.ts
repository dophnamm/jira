import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { Models } from "node-appwrite";

import {
  CreateWorkspaceSchema,
  EMemberRole,
  IMember,
  IWorkspace,
  UpdateWorkspaceSchema,
} from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import {
  generateInviteCode,
  WORKSPACES_API,
  WORKSPACES_DETAIL_API,
} from "@/utils";

import { getMember } from "@/features/members/utils/functions";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

import { getImage } from "../utils/functions";

const app = new Hono()
  .get(WORKSPACES_API, sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = (await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ])) as Models.DocumentList<Models.Document & IMember>;

    if (members.total === 0) {
      return c.json<Models.DocumentList<Models.Document>>({
        documents: [],
        total: 0,
      });
    }

    const workspaceIds = members.documents.map((m) => m.workspaceId);

    const workspaces = (await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.contains("$id", workspaceIds), Query.orderDesc("$createdAt")]
    )) as Models.DocumentList<Models.Document & IWorkspace>;

    return c.json(workspaces);
  })
  .post(
    WORKSPACES_API,
    zValidator("form", CreateWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const user = c.get("user");
      const storage = c.get("storage");
      const databases = c.get("databases");

      const { name, image } = c.req.valid("form");

      const uploadedImageUrl = await getImage({ storage, image });

      const workspace = (await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10),
        } as IWorkspace
      )) as Models.Document & IWorkspace;

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: EMemberRole.ADMIN,
      });

      return c.json(workspace);
    }
  )
  .get(WORKSPACES_DETAIL_API, sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const { id } = c.req.param();

    const member = await getMember({
      databases,
      workspaceId: id,
      userId: user.$id,
    });

    if (!member) return c.json(null);

    const workspace = (await databases.getDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      id
    )) as Models.Document & IWorkspace;

    return c.json(workspace);
  })
  .patch(
    WORKSPACES_DETAIL_API,
    sessionMiddleware,
    zValidator("form", UpdateWorkspaceSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { id } = c.req.param();
      const { name, image } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId: id,
        userId: user.$id,
      });

      if (!member || member.role !== EMemberRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const uploadedImageUrl = await getImage({ storage, image });

      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        id,
        {
          name,
          imageUrl: uploadedImageUrl,
        } as IWorkspace
      );

      return c.json(workspace);
    }
  );

export default app;
