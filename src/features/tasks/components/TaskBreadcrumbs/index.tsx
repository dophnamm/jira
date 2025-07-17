import React from "react";
import Link from "next/link";
import urlcat from "urlcat";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, TrashIcon } from "lucide-react";

import { useConfirmModal } from "@/hooks/useConfirmModal";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { routes } from "@/utils";
import { IProject, ITask } from "@/models";

import { useDeleteTask } from "../../api/useDeleteTask";

interface IProps {
  project: IProject;
  task: ITask;
}

const TaskBreadcrumbs = (props: IProps) => {
  const { project, task } = props;

  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [contextModal, onConfirm] = useConfirmModal({
    title: `Delete ${task.name}?`,
    message: "This action cannot be undone.",
    variant: "destructive",
  });

  const { mutate, isPending } = useDeleteTask();

  const handleDeleteTask = async () => {
    const ok = await onConfirm();
    if (!ok) return;

    mutate(
      {
        param: {
          id: task.$id,
        },
      },
      {
        onSuccess: () => {
          router.push(urlcat(routes.workspaceTasks, { id: workspaceId }));
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      {contextModal}

      <Avatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />

      <Link
        href={urlcat(routes.projectDetail, {
          workspaceId,
          projectId: project.$id,
        })}
      >
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>

      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />

      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>

      <Button
        className="ml-auto"
        variant="destructive"
        disabled={isPending}
        onClick={handleDeleteTask}
      >
        <TrashIcon className="size-4" />

        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
};

export default TaskBreadcrumbs;
