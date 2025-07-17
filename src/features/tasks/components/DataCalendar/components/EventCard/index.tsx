import React from "react";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

import { cn } from "@/lib/utils";

import { ETaskStatus, IMember, IProject } from "@/models";

import Avatar from "@/components/Avatar";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { statusColorMap } from "../../utils/constants";

interface IProps {
  id: string;
  title: string;
  assignee?: IMember;
  project?: IProject;
  status: ETaskStatus;
}

const EventCard = (props: IProps) => {
  const { id, title, project, assignee, status } = props;

  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    router.push(
      urlcat("workspaces/:workspaceId/tasks/:taskId", {
        workspaceId,
        taskId: id,
      })
    );
  };

  return (
    <div className="px-2">
      <div
        onClick={handleOnClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>

        <div className="flex items-center gap-x-1">
          <Avatar name={assignee?.name as string} className="size-6" />

          <div className="size-1 rounded-full bg-neutral-300" />

          <Avatar
            name={project?.name as string}
            image={project?.imageUrl}
            className="size-6"
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
