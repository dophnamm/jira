import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspaceInfo } from "@/features/workspaces/actions";
import JoinWorkspaceForm from "@/features/workspaces/components/JoinWorkspaceForm";

import { routes } from "@/utils";

interface IProps {
  params: {
    id: string;
    inviteCode: string;
  };
}

const JoinInviteCode = async (props: IProps) => {
  const { params } = props;

  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  const workspace = await getWorkspaceInfo(params.id);

  if (!workspace) redirect(routes.home);

  return (
    <div className="w-full ">
      <JoinWorkspaceForm
        initialValues={workspace}
        id={params.id}
        inviteCode={params.inviteCode}
      />
    </div>
  );
};

export default JoinInviteCode;
