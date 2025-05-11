import React, { useEffect, useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";

import { ITask, ETaskStatus } from "@/models";

import ColumnHeader from "./components/ColumnHeader";
import KanbanCard from "./components/KanbanCard";

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

export type TTaskDnD = {
  $id: string;
  status: ETaskStatus;
  priority: number;
};

interface IProps {
  data: ITask[];
  onChange?: (tasks: TTaskDnD[]) => void;
}

const DataKanban = (props: IProps) => {
  const { data, onChange } = props;

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

  useEffect(() => {
    const newTasks: TTasksState = {
      [ETaskStatus.BACKLOG]: [],
      [ETaskStatus.TODO]: [],
      [ETaskStatus.IN_PROGRESS]: [],
      [ETaskStatus.IN_REVIEW]: [],
      [ETaskStatus.DONE]: [],
    };

    data.forEach((item) => {
      newTasks[item.status].push(item);
    });

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as ETaskStatus].sort((a, b) => a.priority - b.priority);
    });

    setTasks(newTasks);
  }, [data]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;

      const sourceStatus = source.droppableId as ETaskStatus;
      const destinationStatus = destination.droppableId as ETaskStatus;

      let updatedPayload: TTaskDnD[] = [];

      setTasks((prev) => {
        const newTasks = { ...prev };

        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          console.error("No task found at the source index");
          return prev;
        }

        const updatedMovedTask =
          sourceStatus !== destinationStatus
            ? { ...movedTask, status: destinationStatus }
            : movedTask;

        newTasks[sourceStatus] = sourceColumn;

        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destinationStatus] = destinationColumn;

        updatedPayload = [];

        updatedPayload.push({
          $id: updatedMovedTask.$id,
          status: destinationStatus,
          priority: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        newTasks[destinationStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPriority = Math.min((index + 1) * 1000, 1_000_000);

            if (task.priority !== newPriority) {
              updatedPayload.push({
                $id: task.$id,
                status: destinationStatus,
                priority: newPriority,
              });
            }
          }
        });

        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPriority = Math.min((index + 1) * 1000, 1_000_000);

              if (task.priority !== newPriority) {
                updatedPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  priority: newPriority,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onChange?.(updatedPayload);
    },
    [onChange]
  );

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto">
          {boards.map((board) => {
            const count = tasks[board].length;

            return (
              <div
                key={board}
                className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
              >
                <ColumnHeader board={board} count={count} />

                <Droppable droppableId={board}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[500px] py-1.5"
                      >
                        {tasks[board].map((task, index) => {
                          return (
                            <Draggable
                              key={task.$id}
                              draggableId={task.$id}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <KanbanCard task={task} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DataKanban;
