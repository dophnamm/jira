"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

import { CreateWorkspaceSchema, TCreateWorkspacesSchema } from "@/models";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

import DottedSeparator from "@/components/DottedSeparator";

import { routes } from "@/utils";

import WorkspaceForm from "../WorkspaceForm";

import { useCreateWorkspace } from "../../api/useCreateWorkspace";

interface IProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = (props: IProps) => {
  const { onCancel } = props;

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
        <WorkspaceForm
          formInstance={formInstance}
          isPending={isPending}
          onSubmit={handleOnSubmit}
          onImageChange={handleImageChange}
          onCancel={onCancel}
        />
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
