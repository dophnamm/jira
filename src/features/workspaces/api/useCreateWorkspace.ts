import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_WORKSPACES_KEY } from "./useGetWorkspaces";

type TResponseType = InferResponseType<typeof client.api.workspaces.$post>;
type TRequestType = InferRequestType<typeof client.api.workspaces.$post>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });

      if (!response.ok) {
        throw new Error("Failed to create workspace!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace create successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_WORKSPACES_KEY] });
    },
    onError: () => {
      toast.error("Failed to create workspace!");
    },
  });

  return mutation;
};
