"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DottedSeparator from "@/components/DottedSeparator";

import { useCreateTaskModal } from "../../hooks/useCreateTaskModal";

const TaskSwitcher = () => {
  const { onOpen } = useCreateTaskModal();

  return (
    <Tabs className="flex-1 w-full border rounded-lg">
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

        <DottedSeparator className="my-4" />

        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>

          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

export default TaskSwitcher;
