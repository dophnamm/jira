import { Suspense } from "react";
import { redirect } from "next/navigation";
import urlcat from "urlcat";

import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";

import { routes } from "@/utils";

const Home = async () => {
  const user = await getCurrentUser();
  const workspaces = await getWorkspaces();

  if (!user) redirect(routes.signIn);
  if (workspaces?.total === 0) {
    redirect(routes.workspaces);
  } else {
    redirect(
      urlcat(routes.workspaceDetail, { id: workspaces?.documents[0].$id })
    );
  }
};

const HomeWrapper = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default HomeWrapper;
