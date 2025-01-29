import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_MEMBERS_KEY = "queryMembersKey";
export const QUERY_MEMBER_KEY = "queryMemberKey";

interface IProps {
  workspaceId: string;
}

export const useGetMembers = (props: IProps) => {
  const { workspaceId } = props;

  const query = useQuery({
    queryKey: [QUERY_MEMBERS_KEY],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to get members!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
