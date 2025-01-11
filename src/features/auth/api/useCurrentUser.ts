import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const QUERY_CURRENT_USER_KEY = "queryCurrentUserKey";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: [QUERY_CURRENT_USER_KEY],
    queryFn: async () => {
      const response = await client.api["current-user"].$get();

      if (!response.ok) return null;

      const user = await response.json();

      return user;
    },
  });

  return query;
};
