import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";

import SettingsProjectClient from "./client";

const SettingsProject = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  return <SettingsProjectClient />;
};

export default SettingsProject;
