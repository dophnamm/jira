import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { routes } from "@/utils";

import { QUERY_WORKSPACE_KEY, QUERY_WORKSPACES_KEY } from "./useGetWorkspaces";

type TResponseType = InferResponseType<
  (typeof client.api.workspaces)[":id"]["$delete"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.workspaces)[":id"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":id"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Failed to delete workspace!");
      }

      return await response.json();
    },
    onSuccess: (workspace) => {
      toast.success("Workspace delete successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_WORKSPACES_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_WORKSPACE_KEY, workspace.$id],
      });
      router.push(routes.home);
    },
    onError: () => {
      toast.error("Failed to delete workspace!");
    },
  });

  return mutation;
};
