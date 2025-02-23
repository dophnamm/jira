/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

import { CreateProjectSchema, TCreateProjectSchema } from "@/models";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

import DottedSeparator from "@/components/DottedSeparator";

import { routes } from "@/utils";

import ProjectForm from "../ProjectForm";

import { useCreateProject } from "../../api/useCreateProject";

interface IProps {
  onCancel?: () => void;
}

const CreateProjectForm = (props: IProps) => {
  const { onCancel } = props;

  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateProject();

  const formInstance = useForm<TCreateProjectSchema>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      image: "",
      workspaceId,
    },
  });

  const handleOnSubmit = (values: TCreateProjectSchema) => {
    const form = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form },
      {
        onSuccess: (project) => {
          formInstance.reset();
          router.push(
            urlcat(routes.projectDetail, {
              workspaceId,
              projectId: project.$id,
            })
          );
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
          Create a new project
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <ProjectForm
          formInstance={formInstance as any}
          isPending={isPending}
          onSubmit={handleOnSubmit as any}
          onImageChange={handleImageChange}
          onCancel={onCancel}
        />
      </CardContent>
    </Card>
  );
};

export default CreateProjectForm;
