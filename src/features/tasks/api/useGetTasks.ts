import { useQuery } from "@tanstack/react-query";

import { ETaskStatus } from "@/models";

import { client } from "@/lib/rpc";

export const QUERY_TASKS_KEY = "queryTasksKey";

interface IProps {
  workspaceId: string;
  projectId?: string | null;
  assigneeId?: string | null;
  status?: ETaskStatus | null;
  search?: string | null;
  dueDate?: string | null;
}

export const useGetTasks = (props: IProps) => {
  const { workspaceId, projectId, assigneeId, status, search, dueDate } = props;

  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: [
      QUERY_TASKS_KEY,
      { workspaceId, projectId, assigneeId, status, search, dueDate },
    ],
    queryFn: async () => {
      const response = await client.api.tasks["$get"]({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          assigneeId: assigneeId ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get tasks!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
