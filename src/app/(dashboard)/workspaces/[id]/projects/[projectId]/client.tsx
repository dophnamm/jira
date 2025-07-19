"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import urlcat from "urlcat";
import isEmpty from "lodash/isEmpty";

import TaskSwitcher from "@/features/tasks/components/TaskSwitcher";
import { useProjectId } from "@/features/projects/hooks/useProjectId";
import { useGetProject } from "@/features/projects/api/useGetProject";

import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import PageError from "@/components/PageError";

import { routes } from "@/utils";

const ProjectDetailClient = () => {
  const projectId = useProjectId();

  const { data, isLoading } = useGetProject(projectId);

  const projectSettingsUrl = useMemo(() => {
    if (!data) return "";

    return urlcat(routes.projectDetailSettings, {
      workspaceId: data.workspaceId,
      projectId: data.$id,
    });
  }, [data]);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (isEmpty(data)) return <PageError message="Project Not Found" />;

  return (
    <div className="flex flex-col gap-y-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar name={data.name} image={data.imageUrl} className="size-8" />

          <p className="text-lg font-semibold">{data.name}</p>
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

export default ProjectDetailClient;
