import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

import { client } from "@/lib/rpc";

import { QUERY_WORKSPACE_KEY, QUERY_WORKSPACES_KEY } from "./useGetWorkspaces";

import { routes } from "@/utils";
import { QUERY_PROJECTS_KEY } from "@/features/projects/api/useGetProjects";

type TResponseType = InferResponseType<
  (typeof client.api.workspaces)[":id"]["join"]["$post"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.workspaces)[":id"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":id"]["join"]["$post"]({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to join workspace!");
      }

      return await response.json();
    },
    onSuccess: (workspace) => {
      toast.success("Join workspace successfully!");
      router.push(urlcat(routes.workspaceDetail, { id: workspace.$id }));
      queryClient.invalidateQueries({ queryKey: [QUERY_WORKSPACES_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_WORKSPACE_KEY, workspace.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_PROJECTS_KEY, workspace.$id],
      });
    },
    onError: () => {
      toast.error("Failed to join workspace!");
    },
  });

  return mutation;
};
