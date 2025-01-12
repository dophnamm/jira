import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";
import UserCTA from "@/features/auth/components/UserCTA";

import { routes } from "@/utils";

const Home = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center grid gap-4">
        <UserCTA />
      </div>
    </div>
  );
};

export default Home;
