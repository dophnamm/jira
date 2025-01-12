import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";

import { CreateWorkspaceSchema } from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import { WORKSPACES_API } from "@/utils";

import { DATABASE_ID, WORKSPACES_ID } from "@/config";

const app = new Hono().post(
  WORKSPACES_API,
  zValidator("json", CreateWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const { name } = c.req.valid("json");

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
      }
    );

    return c.json(workspace);
  }
);

export default app;
