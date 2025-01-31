import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_PROJECTS_KEY } from "./useGetProjects";

type TResponseType = InferResponseType<typeof client.api.projects.$post, 200>;
type TRequestType = InferRequestType<typeof client.api.projects.$post>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects.$post({ form });

      if (!response.ok) {
        throw new Error("Failed to create project!");
      }

      return await response.json();
    },
    onSuccess: (project) => {
      toast.success("Project create successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_PROJECTS_KEY, project.workspaceId],
      });
    },
    onError: () => {
      toast.error("Failed to create project!");
    },
  });

  return mutation;
};
