import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_PROJECTS_KEY = "queryProjectsKey";

interface IProps {
  workspaceId: string;
}

export const useGetProjects = (props: IProps) => {
  const { workspaceId } = props;

  const query = useQuery({
    enabled: !!workspaceId,
    queryKey: [QUERY_PROJECTS_KEY, workspaceId],
    queryFn: async () => {
      const response = await client.api.projects["$get"]({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to get projects!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
