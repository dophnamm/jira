import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { Models } from "node-appwrite";

import { CreateWorkspaceSchema, IWorkspaces } from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import { WORKSPACES_API } from "@/utils";

import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";

const app = new Hono()
  .get(WORKSPACES_API, sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const workspaces = (await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID
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

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
        } as IWorkspaces
      );

      return c.json(workspace);
    }
  );

export default app;
