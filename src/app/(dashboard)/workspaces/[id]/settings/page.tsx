import { redirect } from "next/navigation";

import { IWorkspace } from "@/models";

import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import UpdateWorkspaceForm from "@/features/workspaces/components/UpdateWorkspaceForm";

import { routes } from "@/utils";

interface IProps {
  params: {
    id: string;
  };
}

const SettingsWorkspace = async (props: IProps) => {
  const { params } = props;

  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  const workspace = await getWorkspace(params.id);

  if (!workspace) redirect(routes.workspaces);

  const defaultValues: IWorkspace = {
    name: workspace.name,
    userId: workspace.userId,
    imageUrl: workspace.imageUrl,
    inviteCode: workspace.inviteCode,
  };

  return (
    <UpdateWorkspaceForm
      defaultValues={defaultValues}
      workspaceId={params.id}
    />
  );
};

export default SettingsWorkspace;
