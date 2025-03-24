import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_TASK_KEY } from "./useGetTask";
import { QUERY_TASKS_KEY } from "./useGetTasks";

type TResponseType = InferResponseType<
  (typeof client.api.tasks)[":id"]["$delete"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.tasks)[":id"]["$delete"]
>;

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[":id"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Failed to delete task!");
      }

      return await response.json();
    },
    onSuccess: (task) => {
      toast.success("Task delete successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_TASKS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_TASK_KEY, task.$id],
      });

      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete task!");
    },
  });

  return mutation;
};
