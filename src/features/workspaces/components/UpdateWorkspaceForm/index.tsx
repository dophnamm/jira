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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { useConfirmModal } from "@/hooks/useConfirmModal";

import { routes } from "@/utils";

import { useUpdateWorkspace } from "../../api/useUpdateWorkspace";
import { useDeleteWorkspace } from "../../api/useDeleteWorkspace";

import WorkspaceForm from "../WorkspaceForm";

interface IProps {
  defaultValues: IWorkspace;
  workspaceId: string;
}

const UpdateWorkspaceForm = (props: IProps) => {
  const { defaultValues, workspaceId } = props;

  const router = useRouter();
  const { mutate: updateWorkspace, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isPendingDelete } =
    useDeleteWorkspace();

  const [contextModal, onConfirm] = useConfirmModal({
    title: `Delete ${defaultValues.name}?`,
    message: "This action cannot be undone.",
    variant: "destructive",
  });

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

    updateWorkspace(
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

  const handleOnConfirmDelete = async () => {
    const ok = await onConfirm();

    if (!ok) return;

    deleteWorkspace(
      { param: { id: workspaceId } },
      {
        onSuccess: () => {
          window.location.href = routes.home;
        },
      }
    );
  };

  return (
    <>
      {contextModal}

      <div className="flex flex-col gap-5">
        <Card className="w-full h-full border-none shadow-none">
          <CardHeader className="flex flex-row gap-5 p-7">
            <Button variant="ghost" onClick={router.back}>
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
              onCancel={router.back}
            />
          </CardContent>
        </Card>

        <Card className="w-full h-full border-none shadow-none">
          <CardHeader className="flex flex-col p-7">
            <CardTitle className="text-xl font-bold">Danger zone</CardTitle>

            <CardDescription>
              Deleting a workspace is irreversible and will remove all
              associated data.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-right p-7">
            <Button variant="destructive" onClick={handleOnConfirmDelete}>
              {!isPendingDelete ? "Delete Workspace" : <Spinner />}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UpdateWorkspaceForm;
