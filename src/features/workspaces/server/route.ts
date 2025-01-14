import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { Models } from "node-appwrite";

import {
  CreateWorkspaceSchema,
  EMemberRole,
  IMember,
  IWorkspaces,
} from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import { generateInviteCode, WORKSPACES_API } from "@/utils";

import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";

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
    )) as Models.DocumentList<Models.Document & IWorkspaces>;

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

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const workspace = (await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10),
        } as IWorkspaces
      )) as Models.Document & IWorkspaces;

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: EMemberRole.ADMIN,
      });

      return c.json(workspace);
    }
  );

export default app;
