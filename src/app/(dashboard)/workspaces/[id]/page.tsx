import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";

interface IProps {
  params: {
    id: string;
  };
}

const WorkspaceDetail = async (props: IProps) => {
  const { params } = props;

  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  return <div>WorkspaceDetail - {params.id}</div>;
};

export default WorkspaceDetail;
