import React, { useEffect, useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { ITask, ETaskStatus } from "@/models";

import ColumnHeader from "./components/ColumnHeader";

const boards: ETaskStatus[] = [
  ETaskStatus.BACKLOG,
  ETaskStatus.TODO,
  ETaskStatus.IN_PROGRESS,
  ETaskStatus.IN_REVIEW,
  ETaskStatus.DONE,
];

type TTasksState = {
  [key in ETaskStatus]: ITask[];
};

interface IProps {
  data: ITask[];
}

const DataKanban = (props: IProps) => {
  const { data } = props;

  const [tasks, setTasks] = useState<TTasksState>(() => {
    const initialsTasks: TTasksState = {
      [ETaskStatus.BACKLOG]: [],
      [ETaskStatus.TODO]: [],
      [ETaskStatus.IN_PROGRESS]: [],
      [ETaskStatus.IN_REVIEW]: [],
      [ETaskStatus.DONE]: [],
    };

    data.forEach((item) => {
      initialsTasks[item.status].push(item);
    });

    Object.keys(initialsTasks).forEach((status) => {
      initialsTasks[status as ETaskStatus].sort(
        (a, b) => a.priority - b.priority
      );
    });

    return initialsTasks;
  });

  return (
    <div>
      <DragDropContext onDragEnd={() => {}}>
        <div className="flex overflow-x-auto">
          {boards.map((board) => {
            const count = tasks[board].length;

            return (
              <div
                key={board}
                className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
              >
                <ColumnHeader board={board} count={count} />
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DataKanban;
