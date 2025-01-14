"use client";

import { useRef } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { routes } from "@/utils";

import { useCreateWorkspace } from "../../api/useCreateWorkspace";

interface IProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = (props: IProps) => {
  const { onCancel } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { mutate, isPending } = useCreateWorkspace();

  const formInstance = useForm<TCreateWorkspacesSchema>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const handleOnSubmit = (values: TCreateWorkspacesSchema) => {
    const form = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form },
      {
        onSuccess: (workspace) => {
          formInstance.reset();
          router.push(urlcat(routes.workspaceDetail, { id: workspace.$id }));
        },
      }
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file) formInstance.setValue("image", file);
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...formInstance}>
          <form onSubmit={formInstance.handleSubmit(handleOnSubmit)}>
            <div className="flex flex-col gap-y-4">
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

              <FormField
                control={formInstance.control}
                name="image"
                render={({ field }) => {
                  return (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              fill
                              className="object-cover"
                              alt="image"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-9 text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, JPEG, PNG or SVG max 1MB
                          </p>

                          <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .svg"
                            className="hidden"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />

                          <Button
                            type="button"
                            variant="teritary"
                            size="xs"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
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
    </Card>
  );
};

export default CreateWorkspaceForm;
