"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateTaskSchema,
  ETaskStatus,
  IMemberOptions,
  IProjectOptions,
  TCreateTaskSchema,
} from "@/models";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

import DottedSeparator from "@/components/DottedSeparator";

import TaskForm from "../TaskForm";

import { useCreateTask } from "../../api/useCreateTask";

interface IProps {
  projectOptions: IProjectOptions[];
  memberOptions: IMemberOptions[];
  onCancel: () => void;
}

const CreateTaskForm = (props: IProps) => {
  const { projectOptions, memberOptions, onCancel } = props;

  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateTask();

  const formInstance = useForm<TCreateTaskSchema>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      name: "",
      status: ETaskStatus.BACKLOG,
      workspaceId: workspaceId,
      projectId: "",
      dueDate: undefined,
      assigneeId: "",
      description: "",
    },
  });

  const handleOnSubmit = (values: TCreateTaskSchema) => {
    mutate(
      { json: values },
      {
        onSuccess: () => {
          onCancel();
          formInstance.reset();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new task</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <TaskForm
          formInstance={formInstance}
          isPending={isPending}
          projectOptions={projectOptions}
          memberOptions={memberOptions}
          onSubmit={handleOnSubmit}
          onCancel={onCancel}
        />
      </CardContent>
    </Card>
  );
};

export default CreateTaskForm;
