import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";

import { ETaskStatus, ISelectOptions } from "@/models";

import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Spinner from "@/components/Spinner";
import DatePicker from "@/components/DatePicker";

import { StatusMapping } from "@/utils";

import { useTaskFilter } from "../../hooks/useTaskFilter";

const ALL_VALUE = "all";

interface IProps {
  hideProject?: boolean;
}

const TaskFilter = (props: IProps) => {
  const { hideProject } = props;

  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });
  const [{ projectId, assigneeId, status, search, dueDate }, setFilter] =
    useTaskFilter();

  const projectOps: ISelectOptions[] =
    projects?.documents.map((project) => {
      return {
        value: project.$id,
        label: project.name,
      };
    }) ?? [];

  const memberOps: ISelectOptions[] =
    members?.documents.map((member) => {
      return {
        value: member.$id,
        label: member.name,
      };
    }) ?? [];

  const handleOnStatusChange = (value: string) => {
    setFilter({
      status: value === ALL_VALUE ? undefined : (value as ETaskStatus),
    });
  };

  const handleOnProjectChange = (value: string) => {
    setFilter({ projectId: value === ALL_VALUE ? undefined : value });
  };

  const handleOnMemberChange = (value: string) => {
    setFilter({ assigneeId: value === ALL_VALUE ? undefined : value });
  };

  const handleOnDueDateChange = (value?: Date) => {
    setFilter({ dueDate: value ? value.toISOString() : undefined });
  };

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading)
    return (
      <div className="grid place-items-center">
        <Spinner className="size-6" />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={handleOnStatusChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center gap-1 pr-3">
            <ListChecksIcon className="size-4" />

            <SelectValue placeholder="All Statuses" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Statuses</SelectItem>

          <SelectSeparator />

          {Object.values(ETaskStatus).map((status) => {
            return (
              <SelectItem key={status} value={status}>
                <div className="flex items-center gap-x-2">
                  {StatusMapping[status]}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={handleOnProjectChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center gap-1 pr-3">
            <FolderIcon className="size-4" />

            <SelectValue placeholder="All Projects" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Projects</SelectItem>

          <SelectSeparator />

          {projectOps.map((project) => {
            return (
              <SelectItem key={project.value} value={project.value}>
                <div className="flex items-center gap-x-2">{project.label}</div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={handleOnMemberChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center gap-1 pr-3">
            <UserIcon className="size-4" />

            <SelectValue placeholder="All Assignee" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Assignee</SelectItem>

          <SelectSeparator />

          {memberOps.map((member) => {
            return (
              <SelectItem key={member.value} value={member.value}>
                <div className="flex items-center gap-x-2">{member.label}</div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due Date"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={handleOnDueDateChange}
      />
    </div>
  );
};

export default TaskFilter;
