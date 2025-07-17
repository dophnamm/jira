import Link from "next/link";
import { redirect } from "next/navigation";
import { PencilIcon } from "lucide-react";
import urlcat from "urlcat";

import { getCurrentUser } from "@/features/auth/actions";
import { getProject } from "@/features/projects/actions";
import TaskSwitcher from "@/features/tasks/components/TaskSwitcher";

import Avatar from "@/components/Avatar";

import { Button } from "@/components/ui/button";

import { routes } from "@/utils";

interface IProps {
  params: {
    projectId: string;
  };
}

const ProjectDetail = async (props: IProps) => {
  const { params } = props;

  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  const project = await getProject(params.projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const projectSettingsUrl = urlcat(routes.projectDetailSettings, {
    workspaceId: project.workspaceId,
    projectId: project.$id,
  });

  return (
    <div className="flex flex-col gap-y-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar name={project.name} image={project.imageUrl} />

          <p className="text-lg font-semibold">{project.name}</p>
        </div>

        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href={projectSettingsUrl}>
              <PencilIcon className="size-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <TaskSwitcher hideProjectFilter />
    </div>
  );
};

export default ProjectDetail;
