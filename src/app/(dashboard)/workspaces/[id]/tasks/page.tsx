import React from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";
import TaskSwitcher from "@/features/tasks/components/TaskSwitcher";

const Tasks = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(routes.signIn);
  }

  return (
    <div className="h-full flex flex-col">
      <TaskSwitcher />
    </div>
  );
};

export default Tasks;
