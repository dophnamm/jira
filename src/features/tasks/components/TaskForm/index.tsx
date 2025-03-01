import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  TCreateTaskSchema,
  IProjectOptions,
  IMemberOptions,
  ETaskStatus,
} from "@/models";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";
import DatePicker from "@/components/DatePicker";
import Avatar from "@/components/Avatar";

import { statusMapping } from "@/utils";

interface IProps {
  formInstance: UseFormReturn<TCreateTaskSchema>;
  isPending: boolean;
  isEdit?: boolean;
  projectOptions: IProjectOptions[];
  memberOptions: IMemberOptions[];
  onSubmit: (value: TCreateTaskSchema) => void;
  onCancel?: () => void;
}

const TaskForm = (props: IProps) => {
  const {
    formInstance,
    isPending,
    isEdit,
    projectOptions,
    memberOptions,
    onSubmit,
    onCancel,
  } = props;

  const buttonText = useMemo(() => {
    return isEdit ? "Update Task" : "Create Task";
  }, [isEdit]);

  return (
    <Form {...formInstance}>
      <form onSubmit={formInstance.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={formInstance.control}
            name="workspaceId"
            render={({ field }) => {
              return (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={formInstance.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter task name"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={formInstance.control}
            name="dueDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>

                  <FormControl>
                    <DatePicker
                      {...field}
                      placeholder="Select date"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={formInstance.control}
            name="assigneeId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>

                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>

                    <FormMessage />

                    <SelectContent>
                      {memberOptions.map((member) => {
                        return (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-x-2">
                              <Avatar name={member.name} className="size-6" />

                              {member.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />

          <FormField
            control={formInstance.control}
            name="status"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>

                    <FormMessage />

                    <SelectContent>
                      {Object.values(ETaskStatus).map((status) => {
                        return (
                          <SelectItem key={status} value={status}>
                            <div className="flex items-center gap-x-2">
                              {statusMapping[status]}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />

          <FormField
            control={formInstance.control}
            name="projectId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Project</FormLabel>

                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>

                    <FormMessage />

                    <SelectContent>
                      {projectOptions.map((project) => {
                        return (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                              <Avatar
                                image={project.imageUrl}
                                name={project.name}
                                className="size-6"
                              />

                              {project.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
        </div>

        <DottedSeparator className="py-7" />

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {!isPending ? buttonText : <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
