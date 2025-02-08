import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type TResponseType = InferResponseType<(typeof client.api.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.logout.$post();

      if (!response.ok) {
        throw new Error("Failed to logout!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logout successfully!");
      router.refresh();
      queryClient.clear();
    },
    onError: () => {
      toast.error("Failed to logout!");
    },
  });

  return mutation;
};
