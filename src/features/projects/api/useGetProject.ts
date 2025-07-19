import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_PROJECT_KEY = "queryProjectKey";

export const useGetProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [QUERY_PROJECT_KEY, id],
    queryFn: async () => {
      const response = await client.api.projects[":id"]["$get"]({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to get project!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
