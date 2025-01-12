"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateWorkspaceSchema, TCreateWorkspacesSchema } from "@/models";

import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { useCreateWorkspace } from "../../api/useCreateWorkspace";
import { useEffect } from "react";

interface IProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = (props: IProps) => {
  const { onCancel } = props;

  const { mutate, isPending, isSuccess } = useCreateWorkspace();

  const formInstance = useForm<TCreateWorkspacesSchema>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isSuccess) formInstance.reset();
  }, [isSuccess]);

  const handleOnSubmit = (values: TCreateWorkspacesSchema) => {
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>

        <div className="px-7">
          <DottedSeparator />
        </div>

        <CardContent className="p-7">
          <Form {...formInstance}>
            <form onSubmit={formInstance.handleSubmit(handleOnSubmit)}>
              <div>
                <FormField
                  control={formInstance.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Workspace Name</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter workspace name"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <DottedSeparator className="py-7" />

              <div className="flex items-center justify-end gap-4">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>

                <Button type="submit" size="lg" disabled={isPending}>
                  {!isPending ? "Create Workspace" : <Spinner />}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateWorkspaceForm;
