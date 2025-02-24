import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_TASKS_KEY } from "./useGetTasks";

type TResponseType = InferResponseType<typeof client.api.tasks.$post, 200>;
type TRequestType = InferRequestType<typeof client.api.tasks.$post>;

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create task!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Task create successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_TASKS_KEY] });
    },
    onError: () => {
      toast.error("Failed to create task!");
    },
  });

  return mutation;
};
