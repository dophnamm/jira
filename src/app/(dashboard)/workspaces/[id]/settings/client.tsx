import React from "react";
import isEmpty from "lodash/isEmpty";

import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import UpdateWorkspaceForm from "@/features/workspaces/components/UpdateWorkspaceForm";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import PageError from "@/components/PageError";
import Spinner from "@/components/Spinner";

const SettingsWorkspaceClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: defaultValues, isLoading } = useGetWorkspace(workspaceId);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (isEmpty(defaultValues)) return <PageError message="Project Not Found" />;

  return (
    <UpdateWorkspaceForm
      defaultValues={defaultValues}
      workspaceId={workspaceId}
    />
  );
};

export default SettingsWorkspaceClient;
