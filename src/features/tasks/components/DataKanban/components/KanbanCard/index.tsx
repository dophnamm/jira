import React from "react";
import { MoreHorizontalIcon } from "lucide-react";

import { ITask } from "@/models";

import Avatar from "@/components/Avatar";
import DottedSeparator from "@/components/DottedSeparator";

import TaskDate from "../../../TaskDate";
import TaskActions from "../../../TaskActions";

interface IProps {
  task: ITask;
}

const KanbanCard = (props: IProps) => {
  const { task } = props;

  return (
    <div className="bg-white p-2.5 mb-2.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>

        <TaskActions
          id={task.$id}
          projectId={task.projectId}
          workspaceId={task.workspaceId}
        >
          <MoreHorizontalIcon className="size--[18px] shrink-0 text-neu-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>

      <DottedSeparator />

      <div className="flex items-center gap-x-1.5">
        <Avatar name={task.assignee?.name ?? ""} />

        <div className="size-1 rounded-full bg-neutral-300" />

        <TaskDate value={task.dueDate} className="text-xs" />
      </div>

      <div className="flex items-center gap-x-1.5">
        <Avatar
          image={task.project?.imageUrl}
          name={task.project?.name ?? ""}
        />

        <span className="text-xs font-medium">{task.project?.name}</span>
      </div>
    </div>
  );
};

export default KanbanCard;
