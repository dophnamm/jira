import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_MEMBERS_KEY } from "./useGetMembers";

type TResponseType = InferResponseType<
  (typeof client.api.members)[":id"]["$delete"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.members)[":id"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":id"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Failed to delete member!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member delete successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_MEMBERS_KEY] });
    },
    onError: () => {
      toast.error("Failed to delete member!");
    },
  });

  return mutation;
};
