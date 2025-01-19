import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_WORKSPACES_KEY = "queryWorkspacesKey";
export const QUERY_WORKSPACE_KEY = "queryWorkspaceKey";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: [QUERY_WORKSPACES_KEY],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        throw new Error("Failed to get workspaces!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
