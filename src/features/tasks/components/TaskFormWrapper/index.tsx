import { IMemberOptions, IProjectOptions } from "@/models";

import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import Spinner from "@/components/Spinner";
import { Card, CardContent } from "@/components/ui/card";

import CreateTaskForm from "../CreateTaskForm";

interface IProps {
  onCancel: () => void;
}

const TaskFormWrapper = (props: IProps) => {
  const { onCancel } = props;

  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOps: IProjectOptions[] =
    projects?.documents.map((project) => {
      return {
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
      };
    }) ?? [];

  const memberOps: IMemberOptions[] =
    members?.documents.map((member) => {
      return {
        id: member.$id,
        name: member.name,
      };
    }) ?? [];

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none">
        <CardContent className="flex items-center justify-center h-full">
          <Spinner className="size-5" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      projectOptions={projectOps}
      memberOptions={memberOps}
      onCancel={onCancel}
    />
  );
};

export default TaskFormWrapper;
