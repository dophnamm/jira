import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

import { QUERY_TASKS_KEY } from "./useGetTasks";

type TResponseType = InferResponseType<
  (typeof client.api.tasks)["bulk-update"]["$post"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.tasks)["bulk-update"]["$post"]
>;

export const useBulkUpdateTask = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update"]["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to update tasks!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Tasks update successfully!");
      // router.refresh();
      queryClient.invalidateQueries({
        queryKey: [QUERY_TASKS_KEY],
      });
    },
    onError: () => {
      toast.error("Failed to update tasks!");
    },
  });

  return mutation;
};
