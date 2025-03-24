import React from "react";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Spinner from "@/components/Spinner";

import { useConfirmModal } from "@/hooks/useConfirmModal";

import { useDeleteTask } from "../../api/useDeleteTask";
import { routes } from "@/utils";
import { useUpdateTaskModal } from "../../hooks/useUpdateTaskModal";

interface IProps {
  id: string;
  projectId: string;
  workspaceId: string;
  children: React.ReactNode;
}

const TaskActions = (props: IProps) => {
  const { id, projectId, workspaceId, children } = props;

  const router = useRouter();

  const { setTaskId } = useUpdateTaskModal();
  const { mutate: deleteTask, isPending: isPendingDelete } = useDeleteTask();

  const [contextModal, onConfirm] = useConfirmModal({
    title: "Delete task?",
    message: "This action cannot be undone.",
    variant: "destructive",
  });

  const handleOpenProject = () => {
    const url = urlcat(routes.projectDetail, { workspaceId, projectId });

    router.push(url);
  };

  const handleOpenTaskDetail = () => {
    const url = urlcat(routes.taskDetail, { workspaceId, id });

    router.push(url);
  };

  const handleEditTask = () => {
    setTaskId(id);
  };

  const handleOnConfirmDelete = async () => {
    const ok = await onConfirm();

    if (!ok) return;

    deleteTask({
      param: { id },
    });
  };

  const isPending = isPendingDelete;

  return (
    <div className="flex justify-end">
      {contextModal}

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger disabled={isPendingDelete} asChild>
          {!isPending ? children : <Spinner className="size-5" />}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={handleOpenProject}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleOpenTaskDetail}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleEditTask}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleOnConfirmDelete}
            disabled={false}
            className="font-medium text-red-500 focus:text-red-500 p-[10px]"
          >
            <TrashIcon className="size-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
