"use client";

import urlcat from "urlcat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { cn } from "@/lib/utils";

import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { useCreateProjectModal } from "@/features/projects/hooks/useCreateProjectModal";

import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";

import { routes } from "@/utils";

const Projects = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetProjects(workspaceId);

  const { onOpen } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>

        <RiAddCircleFill
          onClick={onOpen}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      <div>
        {!isLoading ? (
          data?.documents.map((project) => {
            const projectUrl = urlcat(routes.projectDetail, {
              workspaceId,
              projectId: project.$id,
            });
            const isActive = pathname.split("/")[4] === project.$id;

            return (
              <Link href={projectUrl} key={project.$id}>
                <div
                  className={cn(
                    "flex items-center gap-2.5 p-1.5 font-medium hover:text-primary transition text-neutral-500 rounded-md",
                    isActive && "bg-white hover:opacity-100 text-primary"
                  )}
                >
                  <Avatar name={project.name} image={project.imageUrl} />

                  <span className="truncate">{project.name}</span>
                </div>
              </Link>
            );
          })
        ) : (
          <Spinner className="mx-auto" />
        )}
      </div>
    </div>
  );
};

export default Projects;
