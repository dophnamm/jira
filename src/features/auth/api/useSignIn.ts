import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/rpc";

import { routes } from "@/utils";

type TResponseType = InferResponseType<(typeof client.api.login)["$post"]>;
type TRequestType = InferRequestType<(typeof client.api.login)["$post"]>;

export const useSignIn = () => {
  const router = useRouter();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.login.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      router.push(routes.home);
    },
  });

  return mutation;
};
