import { toast } from "sonner";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

import { QUERY_PROJECTS_KEY, QUERY_PROJECT_KEY } from "./useGetProjects";

type TResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>;

export const useUpdateProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[":id"]["$patch"]({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update project!");
      }

      return await response.json();
    },
    onSuccess: (project) => {
      toast.success("Project update successfully!");
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: [QUERY_PROJECTS_KEY, project.workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_PROJECT_KEY, project.$id],
      });
    },
    onError: () => {
      toast.error("Failed to update project!");
    },
  });

  return mutation;
};
