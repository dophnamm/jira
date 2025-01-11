import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/rpc";

import { QUERY_CURRENT_USER_KEY } from "./useCurrentUser";

type TResponseType = InferResponseType<(typeof client.api.logout)["$post"]>;
type TRequestType = InferRequestType<(typeof client.api.logout)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async () => {
      const response = await client.api.logout.$post();

      return await response.json();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QUERY_CURRENT_USER_KEY] });
    },
  });

  return mutation;
};
