import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { getProject } from "@/features/projects/actions";
import UpdateProjectForm from "@/features/projects/components/UpdateProjectForm";

import { routes } from "@/utils";

interface IProps {
  params: {
    projectId: string;
  };
}

const SettingsProject = async (props: IProps) => {
  const { params } = props;

  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  const project = await getProject(params.projectId);

  return (
    <UpdateProjectForm defaultValues={project} projectId={params.projectId} />
  );
};

export default SettingsProject;
