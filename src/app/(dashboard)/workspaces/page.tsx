import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";

import { routes } from "@/utils";

const Workspaces = async () => {
  const user = await getCurrentUser();
  if (!user) redirect(routes.signIn);

  return <CreateWorkspaceForm />;
};

const WorkspacesWrapper = () => {
  return (
    <Suspense>
      <Workspaces />
    </Suspense>
  );
};

export default WorkspacesWrapper;
