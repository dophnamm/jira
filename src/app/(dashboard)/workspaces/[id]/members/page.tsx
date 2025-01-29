import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";
import MembersList from "@/features/members/components/MembersList";

import { routes } from "@/utils";

const Members = async () => {
  const user = await getCurrentUser();

  if (!user) redirect(routes.signIn);

  return (
    <div className="w-full">
      <MembersList />
    </div>
  );
};

export default Members;
