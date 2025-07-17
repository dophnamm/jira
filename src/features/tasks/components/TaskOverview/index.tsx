import React from "react";
import { PencilIcon } from "lucide-react";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import DottedSeparator from "@/components/DottedSeparator";
import { Badge } from "@/components/ui/badge";

import { ITask } from "@/models";
import { statusMapping } from "@/utils";

import TaskDate from "../TaskDate";
import OverviewProperty from "../OverviewProperty";

import { useUpdateTaskModal } from "../../hooks/useUpdateTaskModal";

interface IProps {
  task: ITask;
}

const TaskOverview = (props: IProps) => {
  const { task } = props;

  const { onOpen } = useUpdateTaskModal();

  const handleUpdateTask = () => {
    onOpen(task.$id);
  };

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>

          <Button size="sm" variant="outline" onClick={handleUpdateTask}>
            <PencilIcon className="size-4" />
            Edit
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <Avatar name={task.assignee?.name as string} className="size-6" />

            <p className="text-sm font-medium">{task.assignee?.name}</p>
          </OverviewProperty>

          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>

          <OverviewProperty label="Status">
            <Badge variant={task.status}>{statusMapping[task.status]}</Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
