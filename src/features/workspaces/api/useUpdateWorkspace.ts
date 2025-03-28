import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

import { QUERY_WORKSPACES_KEY } from "./useGetWorkspaces";
import { QUERY_WORKSPACE_KEY } from "./useGetWorkspace";

type TResponseType = InferResponseType<
  (typeof client.api.workspaces)[":id"]["$patch"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.workspaces)[":id"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const router = useRouter();
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
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [QUERY_WORKSPACES_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_WORKSPACE_KEY, workspace.$id],
      });
    },
    onError: () => {
      toast.error("Failed to update workspace!");
    },
  });

  return mutation;
};
