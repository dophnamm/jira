import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_TASK_KEY = "queryTaskKey";

interface IProps {
  taskId?: string;
}

export const useGetTask = (props: IProps) => {
  const { taskId } = props;

  const query = useQuery({
    enabled: !!taskId,
    queryKey: [QUERY_TASK_KEY, taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":id"]["$get"]({
        param: { id: taskId ?? "" },
      });

      if (!response.ok) {
        throw new Error("Failed to get task!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
