"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateTaskSchema,
  IMemberOptions,
  IProjectOptions,
  ITask,
  TCreateTaskSchema,
} from "@/models";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

import DottedSeparator from "@/components/DottedSeparator";

import TaskForm from "../TaskForm";

import { useUpdateTask } from "../../api/useUpdateTask";

interface IProps {
  defaultValues: ITask;
  projectOptions: IProjectOptions[];
  memberOptions: IMemberOptions[];
  onCancel: () => void;
}

const UpdateTaskForm = (props: IProps) => {
  const { defaultValues, projectOptions, memberOptions, onCancel } = props;

  const { mutate, isPending } = useUpdateTask();

  const formInstance = useForm<TCreateTaskSchema>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      ...defaultValues,
      dueDate: new Date(defaultValues.dueDate),
    },
  });

  const handleOnSubmit = (values: TCreateTaskSchema) => {
    mutate(
      { json: values, param: { id: defaultValues.$id } },
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
        <CardTitle className="text-xl font-bold">
          {defaultValues.name}
        </CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <TaskForm
          isEdit
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

export default UpdateTaskForm;
