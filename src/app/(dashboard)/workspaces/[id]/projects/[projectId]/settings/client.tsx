"use client";

import isEmpty from "lodash/isEmpty";

import { useGetProject } from "@/features/projects/api/useGetProject";
import { useProjectId } from "@/features/projects/hooks/useProjectId";
import UpdateProjectForm from "@/features/projects/components/UpdateProjectForm";

import Spinner from "@/components/Spinner";
import PageError from "@/components/PageError";

const SettingsProjectClient = () => {
  const projectId = useProjectId();

  const { data: defaultValues, isLoading } = useGetProject(projectId);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (isEmpty(defaultValues)) return <PageError message="Project Not Found" />;

  return (
    <div>
      <UpdateProjectForm defaultValues={defaultValues} projectId={projectId} />
    </div>
  );
};

export default SettingsProjectClient;
