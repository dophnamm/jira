"use client";

import urlcat from "urlcat";
import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";
import isEmpty from "lodash/isEmpty";
import { useIsFetching } from "@tanstack/react-query";

import {
  QUERY_WORKSPACES_KEY,
  useGetWorkspaces,
} from "@/features/workspaces/api/useGetWorkspaces";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { routes } from "@/utils";

import Empty from "../Empty";
import Spinner from "../Spinner";
import Avatar from "../Avatar";

const WorkspaceSwitcher = () => {
  const router = useRouter();
  const isFetching = useIsFetching({ queryKey: [QUERY_WORKSPACES_KEY] });

  const workspaceId = useWorkspaceId();
  const { onOpen } = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const handleOnChange = (id: string) => {
    router.push(urlcat(routes.workspaceDetail, { id }));
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>

        <RiAddCircleFill
          onClick={onOpen}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      <Select value={workspaceId} onValueChange={handleOnChange}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          {isLoading || isFetching > 0 ? (
            <Spinner />
          ) : (
            <SelectValue placeholder="No workspace selected" />
          )}
        </SelectTrigger>

        <SelectContent>
          {!isEmpty(data?.documents) ? (
            data?.documents.map((workspace) => {
              return (
                <SelectItem
                  key={workspace.$id}
                  value={workspace.$id}
                  className="cursor-pointer"
                >
                  <div className="flex justify-start items-center gap-3 font-medium">
                    <Avatar name={workspace.name} image={workspace.imageUrl} />

                    <span className="truncate">{workspace.name}</span>
                  </div>
                </SelectItem>
              );
            })
          ) : (
            <Empty />
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
