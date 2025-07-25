"use client";

import { useCallback } from "react";
import { PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { params } from "@/utils";

import DataTable from "../DataTable";
import DataCalendar from "../DataCalendar";
import DataKanban, { TTaskDnD } from "../DataKanban";
import { columns } from "../Columns";
import TaskFilter from "../TaskFilter";

import { useGetTasks } from "../../api/useGetTasks";
import { useBulkUpdateTask } from "../../api/useBulkUpdateTask";

import { useTaskFilter } from "../../hooks/useTaskFilter";
import { useCreateTaskModal } from "../../hooks/useCreateTaskModal";

import { TABS_KEY } from "../../utils/constants";

interface IProps {
  hideProjectFilter?: boolean;
}

const TaskSwitcher = (props: IProps) => {
  const { hideProjectFilter } = props;

  const [tabKey, setTabKey] = useQueryState(params.tabView, {
    defaultValue: TABS_KEY.table,
  });

  const workspaceId = useWorkspaceId();
  const { onOpen } = useCreateTaskModal();
  const { mutate: bulkUpdateTask } = useBulkUpdateTask();
  const [{ projectId, assigneeId, status, search, dueDate }] = useTaskFilter();
  const { data: tasks, isLoading: isLoadingTask } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    search,
    dueDate,
  });

  const handleKanbanOnChange = useCallback(
    (tasks: TTaskDnD[]) => {
      bulkUpdateTask({
        json: { tasks },
      });
    },
    [bulkUpdateTask]
  );

  const data = tasks?.documents ?? [];

  return (
    <Tabs
      defaultValue={tabKey}
      onValueChange={setTabKey}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>

            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>

            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>

          <Button size="sm" className="w-full lg:w-auto" onClick={onOpen}>
            <PlusIcon />
            New
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <TaskFilter hideProjectFilter={hideProjectFilter} />

        <DottedSeparator className="my-4" />

        {isLoadingTask ? (
          <div className="grid place-items-center h-full">
            <Spinner className="size-6" />
          </div>
        ) : (
          <>
            <TabsContent value={TABS_KEY.table} className="mt-0 h-full">
              <DataTable columns={columns} data={data} />
            </TabsContent>

            <TabsContent value={TABS_KEY.kanban} className="mt-0 h-full">
              <DataKanban data={data} onChange={handleKanbanOnChange} />
            </TabsContent>

            <TabsContent
              value={TABS_KEY.calendar}
              className="mt-0 h-full overflow-y-scroll"
            >
              <DataCalendar data={data} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskSwitcher;
