import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

import { QUERY_TASK_KEY } from "./useGetTask";
import { QUERY_TASKS_KEY } from "./useGetTasks";

type TResponseType = InferResponseType<
  (typeof client.api.tasks)[":id"]["$patch"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.tasks)[":id"]["$patch"]
>;

export const useUpdateTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[":id"]["$patch"]({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update task!");
      }

      return await response.json();
    },
    onSuccess: (task) => {
      toast.success("Task update successfully!");
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: [QUERY_TASKS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_TASK_KEY, task.$id],
      });
    },
    onError: () => {
      toast.error("Failed to update task!");
    },
  });

  return mutation;
};
