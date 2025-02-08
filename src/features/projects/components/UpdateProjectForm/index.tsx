"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaAngleLeft } from "react-icons/fa6";

import { IProject, TUpdateProjectSchema, UpdateProjectSchema } from "@/models";

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

import { useUpdateProject } from "../../api/useUpdateProject";
import { useDeleteProject } from "../../api/useDeleteWorkspace";

import ProjectForm from "../ProjectForm";

interface IProps {
  defaultValues: IProject;
  projectId: string;
}

const UpdateProjectForm = (props: IProps) => {
  const { defaultValues, projectId } = props;

  const router = useRouter();
  const { mutate: updateProject, isPending } = useUpdateProject();
  const { mutate: deleteProject, isPending: isPendingDelete } =
    useDeleteProject();

  const [contextModal, onConfirm] = useConfirmModal({
    title: `Delete ${defaultValues.name}?`,
    message: "This action cannot be undone.",
    variant: "destructive",
  });

  const formInstance = useForm<TUpdateProjectSchema>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      name: defaultValues.name,
      image: defaultValues.imageUrl ?? "",
    },
  });

  const handleOnSubmit = (values: TUpdateProjectSchema) => {
    const form = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    updateProject(
      { form, param: { id: projectId } },
      {
        onSuccess: (project) => {
          formInstance.reset(project);
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

    deleteProject({
      param: { id: projectId },
    });
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
            <ProjectForm
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
              Deleting a project is irreversible and will remove all associated
              data.
            </CardDescription>
          </CardHeader>

          <div className="px-7">
            <DottedSeparator />
          </div>

          <CardContent className="text-right p-7">
            <Button variant="destructive" onClick={handleOnConfirmDelete}>
              {!isPendingDelete ? "Delete Project" : <Spinner />}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UpdateProjectForm;
