import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Models, Query } from "node-appwrite";

import {
  CreateProjectSchema,
  UpdateProjectSchema,
  TCreateProjectSchema,
  TUpdateProjectSchema,
  IProject,
  QueryProjects,
} from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import { getMember } from "@/features/members/utils/functions";

import { getImage, PROJECTS_API, PROJECTS_DETAIL_API } from "@/utils";

import { DATABASE_ID, PROJECTS_ID } from "@/config";

const app = new Hono()
  .get(
    PROJECTS_API,
    sessionMiddleware,
    zValidator("query", QueryProjects),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) {
        return c.json({ error: "Missing workspace" }, 400);
      }

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const projects = (await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_ID,
        [Query.equal("workspaceId", workspaceId), Query.orderDesc("$createdAt")]
      )) as Models.DocumentList<Models.Document & IProject>;

      return c.json(projects);
    }
  )
  .get(PROJECTS_DETAIL_API, sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { id } = c.req.param();

    const existingProject = (await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      id
    )) as Models.Document & IProject;

    const member = await getMember({
      databases,
      workspaceId: existingProject.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json(existingProject);
  })
  .post(
    PROJECTS_API,
    sessionMiddleware,
    zValidator("form", CreateProjectSchema),
    async (c) => {
      const user = c.get("user");
      const storage = c.get("storage");
      const databases = c.get("databases");

      const { name, image, workspaceId } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const uploadedImageUrl = await getImage({ storage, image });

      const project = (await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          workspaceId,
          imageUrl: uploadedImageUrl,
        } as TCreateProjectSchema
      )) as Models.Document & IProject;

      return c.json(project);
    }
  )
  .patch(
    PROJECTS_DETAIL_API,
    sessionMiddleware,
    zValidator("form", UpdateProjectSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { id } = c.req.param();
      const { name, image } = c.req.valid("form");

      const existingProject = (await databases.getDocument(
        DATABASE_ID,
        PROJECTS_ID,
        id
      )) as Models.Document & IProject;

      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const uploadedImageUrl = await getImage({ storage, image });

      const project = (await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_ID,
        id,
        {
          name,
          imageUrl: uploadedImageUrl,
          workspaceId: existingProject.workspaceId,
        } as TUpdateProjectSchema
      )) as Models.Document & IProject;

      return c.json(project);
    }
  )
  .delete(PROJECTS_DETAIL_API, sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { id } = c.req.param();

    const existingProject = (await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      id
    )) as Models.Document & IProject;

    const member = await getMember({
      databases,
      workspaceId: existingProject.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // TODO: delete tasks

    await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, id);

    return c.json({ $id: id, workspaceId: existingProject.workspaceId });
  });

export default app;
