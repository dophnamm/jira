import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

import { QUERY_CURRENT_USER_KEY } from "./useCurrentUser";

type TResponseType = InferResponseType<(typeof client.api.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.logout.$post();

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [QUERY_CURRENT_USER_KEY] });
    },
  });

  return mutation;
};
