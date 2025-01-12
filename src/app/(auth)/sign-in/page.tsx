import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";
import SignInCard from "@/features/auth/components/SignInCard";

import { routes } from "@/utils";

const SignIn = async () => {
  const user = await getCurrentUser();

  if (user) redirect(routes.home);

  return (
    <div>
      <SignInCard />
    </div>
  );
};

export default SignIn;
