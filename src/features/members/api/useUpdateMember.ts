import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { QUERY_MEMBERS_KEY } from "./useGetMembers";

type TResponseType = InferResponseType<
  (typeof client.api.members)[":id"]["$patch"],
  200
>;
type TRequestType = InferRequestType<
  (typeof client.api.members)[":id"]["$patch"]
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseType, Error, TRequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.members[":id"]["$patch"]({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update member!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member update successfully!");
      queryClient.invalidateQueries({ queryKey: [QUERY_MEMBERS_KEY] });
    },
    onError: () => {
      toast.error("Failed to update member!");
    },
  });

  return mutation;
};
