import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";
import { routes } from "@/utils";

import ProjectDetailClient from "./client";

const ProjectDetail = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  return <ProjectDetailClient />;
};

export default ProjectDetail;
