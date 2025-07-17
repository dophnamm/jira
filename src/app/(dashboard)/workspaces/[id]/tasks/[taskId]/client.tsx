"use client";

import React from "react";

import { useTaskId } from "@/features/tasks/hooks/useTaskId";
import { useGetTask } from "@/features/tasks/api/useGetTask";
import TaskOverview from "@/features/tasks/components/TaskOverview";
import TaskBreadcrumbs from "@/features/tasks/components/TaskBreadcrumbs";
import TaskDescription from "@/features/tasks/components/TaskDescription";

import Loading from "@/components/common/Loading";
import PageError from "@/components/PageError";
import DottedSeparator from "@/components/DottedSeparator";

const TaskDetailClient = () => {
  const taskId = useTaskId();

  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <PageError message="Task Not Found" />;
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />

      <DottedSeparator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={data} />

        <TaskDescription task={data} />
      </div>
    </div>
  );
};

export default TaskDetailClient;
