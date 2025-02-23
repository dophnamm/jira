import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_TASKS_KEY = "queryTasksKey";

interface IProps {
  workspaceId: string;
}

export const useGetTasks = (props: IProps) => {
  const { workspaceId } = props;

  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: [QUERY_TASKS_KEY, workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks["$get"]({
        query: { workspaceId },
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
