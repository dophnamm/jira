import { toast } from "sonner";
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

      if (!response.ok) {
        throw new Error("Failed to register account!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Register account successfully!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [QUERY_CURRENT_USER_KEY] });
    },
    onError: () => {
      toast.error("Failed to register account!");
    },
  });

  return mutation;
};
