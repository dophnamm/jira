import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_WORKSPACE_KEY, QUERY_WORKSPACES_KEY } from "./useGetWorkspaces";

type TResponseType = InferResponseType<
  (typeof client.api.workspaces)[":id"]["reset-invite-code"]["$post"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.workspaces)[":id"]["reset-invite-code"]["$post"]
>;

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":id"]["reset-invite-code"][
        "$post"
      ]({ param });

      if (!response.ok) {
        throw new Error("Failed to reset invite code!");
      }

      return await response.json();
    },
    onSuccess: (workspace) => {
      toast.success("Reset invite code successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_WORKSPACES_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_WORKSPACE_KEY, workspace.$id],
      });
    },
    onError: () => {
      toast.error("Failed to reset invite code!");
    },
  });

  return mutation;
};
