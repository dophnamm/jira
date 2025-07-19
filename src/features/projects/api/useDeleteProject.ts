import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import urlcat from "urlcat";

import { client } from "@/lib/rpc";

import { routes } from "@/utils";

import { QUERY_PROJECTS_KEY } from "./useGetProjects";
import { QUERY_PROJECT_KEY } from "./useGetProject";

type TResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$delete"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$delete"]
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":id"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Failed to delete project!");
      }

      return await response.json();
    },
    onSuccess: (project) => {
      toast.success("Project delete successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_PROJECTS_KEY] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_PROJECT_KEY, project.$id],
      });

      router.push(urlcat(routes.workspaceDetail, { id: project.workspaceId }));
    },
    onError: () => {
      toast.error("Failed to delete project!");
    },
  });

  return mutation;
};
