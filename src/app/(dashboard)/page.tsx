import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";

const Home = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  return <div>This is home page</div>;
};

export default Home;
