import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";

const Home = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  const handleOnCancel = () => {};

  return (
    <div className="bg-muted p-4">
      <CreateWorkspaceForm />
    </div>
  );
};

export default Home;
