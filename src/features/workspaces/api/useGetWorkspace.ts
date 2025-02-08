import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_WORKSPACE_KEY = "queryWorkspaceKey";

export const useGetWorkspace = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [QUERY_WORKSPACE_KEY, id],
    queryFn: async () => {
      const response = await client.api.workspaces[":id"]["$get"]({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to get workspaces!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
