import { redirect } from "next/navigation";

import SignUpCard from "@/features/auth/components/SignUpCard";
import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";

const SignUp = async () => {
  const user = await getCurrentUser();

  if (user) redirect(routes.home);

  return (
    <div>
      <SignUpCard />
    </div>
  );
};

export default SignUp;
