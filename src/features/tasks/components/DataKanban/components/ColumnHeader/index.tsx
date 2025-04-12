import React from "react";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";

import { ETaskStatus } from "@/models";

import { statusMapping } from "@/utils";
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "@/features/tasks/hooks/useCreateTaskModal";

const statusIconMap: Record<ETaskStatus, React.ReactNode> = {
  [ETaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size[18px] text-pink-400" />
  ),
  [ETaskStatus.TODO]: <CircleIcon className="size[18px] text-red-400" />,
  [ETaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size[18px] text-yellow-400" />
  ),
  [ETaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size[18px] text-blue-400" />
  ),
  [ETaskStatus.DONE]: (
    <CircleCheckIcon className="size[18px] text-emerald-400" />
  ),
};

interface IProps {
  board: ETaskStatus;
  count: number;
}

const ColumnHeader = (props: IProps) => {
  const { board, count } = props;

  const { onOpen } = useCreateTaskModal();

  const icon = statusIconMap[board];

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}

        <h2 className="text-sm font-medium">{statusMapping[board]}</h2>

        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {count}
        </div>
      </div>

      <Button variant="ghost" size="icon" className="size-5" onClick={onOpen}>
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
};

export default ColumnHeader;
