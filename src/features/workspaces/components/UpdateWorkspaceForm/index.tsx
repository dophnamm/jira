"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaAngleLeft } from "react-icons/fa6";
import urlcat from "urlcat";

import {
  IWorkspace,
  TUpdateWorkspacesSchema,
  UpdateWorkspaceSchema,
} from "@/models";

import { Button } from "@/components/ui/button";

import DottedSeparator from "@/components/DottedSeparator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { routes } from "@/utils";

import { useUpdateWorkspace } from "../../api/useUpdateWorkspace";
import { useWorkspaceId } from "../../hooks/useWorkspaceId";

import WorkspaceForm from "../WorkspaceForm";

interface IProps {
  defaultValues: IWorkspace;
  workspaceId: string;
}

const UpdateWorkspaceForm = (props: IProps) => {
  const { defaultValues } = props;

  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useUpdateWorkspace();

  const formInstance = useForm<TUpdateWorkspacesSchema>({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      name: defaultValues.name,
      image: defaultValues.imageUrl ?? "",
    },
  });

  const handleOnSubmit = (values: TUpdateWorkspacesSchema) => {
    const form = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form, param: { id: workspaceId } },
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

  const handleOnCancel = () => {
    router.back();
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex flex-row gap-5 p-7">
        <Button variant="ghost" onClick={handleOnCancel}>
          <FaAngleLeft />
        </Button>

        <CardTitle className="text-xl font-bold">
          {defaultValues.name}
        </CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <WorkspaceForm
          formInstance={formInstance}
          isPending={isPending}
          isEdit
          onSubmit={handleOnSubmit}
          onImageChange={handleImageChange}
          onCancel={handleOnCancel}
        />
      </CardContent>
    </Card>
  );
};

export default UpdateWorkspaceForm;
