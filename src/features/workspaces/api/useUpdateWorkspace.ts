import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_WORKSPACE_KEY, QUERY_WORKSPACES_KEY } from "./useGetWorkspaces";

type TResponseType = InferResponseType<
  (typeof client.api.workspaces)[":id"]["$patch"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.workspaces)[":id"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":id"]["$patch"]({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update workspace!");
      }

      return await response.json();
    },
    onSuccess: (workspace) => {
      toast.success("Workspace update successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_WORKSPACES_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_WORKSPACE_KEY, workspace.$id],
      });
    },
    onError: () => {
      toast.error("Failed to create workspace!");
    },
  });

  return mutation;
};
