import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/rpc";

type TResponseType = InferResponseType<(typeof client.api.register)["$post"]>;
type TRequestType = InferRequestType<(typeof client.api.register)["$post"]>;

export const useSignUp = () => {
  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.register["$post"]({ json });

      return await response.json();
    },
  });

  return mutation;
};
