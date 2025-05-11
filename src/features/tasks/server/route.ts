import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Models, Query } from "node-appwrite";

import {
  CreateTaskSchema,
  QueryTasks,
  ITask,
  IMember,
  IProject,
  UpdateTaskSchema,
  BulkTaskUpdate,
} from "@/models";

import { sessionMiddleware } from "@/middleware/session";

import { getMember } from "@/features/members/utils/functions";

import { createAdminClient } from "@/lib/appwrite";

import { TASKS_API, TASKS_DETAIL_API, TASKS_BULK_API } from "@/utils";

import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";

const app = new Hono()
  .get(
    TASKS_API,
    sessionMiddleware,
    zValidator("query", QueryTasks),
    async (c) => {
      const { users } = await createAdminClient();

      const databases = c.get("databases");
      const user = c.get("user");

      const { workspaceId, projectId, assigneeId, search, status, dueDate } =
        c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const queries = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];

      if (projectId) {
        queries.push(Query.equal("projectId", projectId));
      }

      if (assigneeId) {
        queries.push(Query.equal("assigneeId", assigneeId));
      }

      if (status) {
        queries.push(Query.equal("status", status));
      }

      if (dueDate) {
        queries.push(Query.equal("dueDate", dueDate));
      }

      if (search) {
        queries.push(Query.search("name", search));
      }

      const tasks = (await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        queries
      )) as Models.DocumentList<Models.Document & ITask>;

      const projectIds = tasks.documents.map((task) => task.projectId);
      const assigneeIds = tasks.documents.map((task) => task.assigneeId);

      const projects = (await databases.listDocuments(
        DATABASE_ID,
        PROJECTS_ID,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      )) as Models.DocumentList<Models.Document & IProject>;

      const members = (await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
      )) as Models.DocumentList<Models.Document & IMember>;

      const assignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);
          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find((project) => {
          return project.$id === task.projectId;
        });

        const assignee = assignees.find((assignee) => {
          return assignee.$id === task.assigneeId;
        });

        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({
        ...tasks,
        documents: populatedTasks,
      });
    }
  )
  .get(TASKS_DETAIL_API, sessionMiddleware, async (c) => {
    const { users } = await createAdminClient();
    const currentUser = c.get("user");
    const databases = c.get("databases");
    const { id } = c.req.param();

    const task = (await databases.getDocument(
      DATABASE_ID,
      TASKS_ID,
      id
    )) as Models.Document & ITask;

    const currentMember = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: currentUser.$id,
    });

    if (!currentMember) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const project = (await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      task.projectId
    )) as Models.Document & IProject;

    const member = (await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      task.assigneeId
    )) as Models.Document & IMember;

    const user = await users.get(member.userId);

    const assignee = {
      ...member,
      name: user.name,
      email: user.email,
    };

    return c.json({
      ...task,
      project,
      assignee,
    });
  })
  .post(
    TASKS_API,
    sessionMiddleware,
    zValidator("json", CreateTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const {
        name,
        status,
        projectId,
        workspaceId,
        assigneeId,
        description,
        dueDate,
      } = c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const highestPriorityTasks = (await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("priority"),
          Query.limit(1),
        ]
      )) as Models.DocumentList<Models.Document & ITask>;

      const newPriority =
        highestPriorityTasks.documents.length > 0
          ? highestPriorityTasks.documents[0].priority + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          description,
          priority: newPriority,
        } as ITask
      );

      return c.json(task);
    }
  )
  .patch(
    TASKS_DETAIL_API,
    sessionMiddleware,
    zValidator("json", UpdateTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { name, status, projectId, assigneeId, description, dueDate } =
        c.req.valid("json");
      const { id } = c.req.param();

      const existingTask = (await databases.getDocument(
        DATABASE_ID,
        TASKS_ID,
        id
      )) as Models.Document & ITask;

      const member = await getMember({
        databases,
        workspaceId: existingTask.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const task = await databases.updateDocument(DATABASE_ID, TASKS_ID, id, {
        name,
        status,
        projectId,
        dueDate,
        assigneeId,
        description,
      } as ITask);

      return c.json(task);
    }
  )
  .delete(TASKS_DETAIL_API, sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { id } = c.req.param();

    const task = (await databases.getDocument(
      DATABASE_ID,
      TASKS_ID,
      id
    )) as Models.Document & ITask;

    const member = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await databases.deleteDocument(DATABASE_ID, TASKS_ID, id);

    return c.json({ $id: id });
  })
  .post(
    TASKS_BULK_API,
    sessionMiddleware,
    zValidator("json", BulkTaskUpdate),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { tasks } = await c.req.valid("json");

      const taskToUpdate = (await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.contains(
            "$id",
            tasks.map((task) => task.$id)
          ),
        ]
      )) as Models.DocumentList<Models.Document & ITask>;

      const workspaceIds = new Set(
        taskToUpdate.documents.map((task) => task.workspaceId)
      );

      if (workspaceIds.size !== 1) {
        return c.json({ error: "All tasks must along to the same workspace" });
      }

      const workspaceId = workspaceIds.values().next().value as string;

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const { $id, status, priority } = task;

          return databases.updateDocument(DATABASE_ID, TASKS_ID, $id, {
            status,
            priority,
          });
        })
      );

      return c.json(updatedTasks);
    }
  );

export default app;
