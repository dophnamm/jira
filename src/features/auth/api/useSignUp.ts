import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/rpc";

import { QUERY_CURRENT_USER_KEY } from "./useCurrentUser";

type TResponseType = InferResponseType<(typeof client.api.register)["$post"]>;
type TRequestType = InferRequestType<(typeof client.api.register)["$post"]>;

export const useSignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.register["$post"]({ json });

      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [QUERY_CURRENT_USER_KEY] });
    },
  });

  return mutation;
};
