import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Models, Query } from "node-appwrite";

import {
  EMemberRole,
  IMember,
  QueryMembers,
  UpdateMemberRoleSchema,
} from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import { createAdminClient } from "@/lib/appwrite";

import { MEMBERS_API, MEMBERS_DETAIL_API } from "@/utils";

import { DATABASE_ID, MEMBERS_ID } from "@/config";

import { getMember } from "../utils/functions";

const app = new Hono()
  .get(
    MEMBERS_API,
    sessionMiddleware,
    zValidator("query", QueryMembers),
    async (c) => {
      const { users } = await createAdminClient();
      const { workspaceId } = c.req.valid("query");

      const databases = c.get("databases");
      const user = c.get("user");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const members = (await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
        Query.equal("workspaceId", workspaceId),
      ])) as Models.DocumentList<Models.Document & IMember>;

      const populatedMembers = await Promise.all(
        members.documents.map(async (item) => {
          const user = await users.get(item.userId);

          return {
            ...item,
            name: user.name,
            email: user.email,
          };
        })
      );

      return c.json({
        members,
        documents: populatedMembers,
      });
    }
  )
  .delete(MEMBERS_DETAIL_API, sessionMiddleware, async (c) => {
    const { id } = c.req.param();

    const user = c.get("user");
    const databases = c.get("databases");

    const memberToDelete = (await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      id
    )) as Models.Document & IMember;

    const allMemberInWorkspace = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", memberToDelete.workspaceId)]
    );

    const member = await getMember({
      databases,
      workspaceId: memberToDelete.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (
      member.$id !== memberToDelete.$id &&
      member.role !== EMemberRole.ADMIN
    ) {
      return c.json({ error: "Forbidden" }, 403);
    }

    if (allMemberInWorkspace.total === 1) {
      return c.json({ error: "Cannot delete the only member" }, 400);
    }

    await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, id);

    return c.json({ $id: id });
  })
  .patch(
    MEMBERS_DETAIL_API,
    sessionMiddleware,
    zValidator("json", UpdateMemberRoleSchema),
    async (c) => {
      const { id } = c.req.param();
      const { role } = c.req.valid("json");

      const user = c.get("user");
      const databases = c.get("databases");

      const memberTUpdate = (await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        id
      )) as Models.Document & IMember;

      const allMemberInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberTUpdate.workspaceId)]
      );

      const member = await getMember({
        databases,
        workspaceId: memberTUpdate.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (member.role !== EMemberRole.ADMIN) {
        return c.json({ error: "Forbidden" }, 403);
      }

      if (allMemberInWorkspace.total === 1) {
        return c.json({ error: "Cannot downgrade the only member" }, 400);
      }

      await databases.updateDocument(DATABASE_ID, MEMBERS_ID, id, {
        role,
      });

      return c.json({ $id: id });
    }
  );

export default app;
