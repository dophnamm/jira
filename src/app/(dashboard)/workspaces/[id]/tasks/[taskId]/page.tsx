import React from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions";

import { routes } from "@/utils";

import TaskDetailClient from "./client";

const TaskDetail = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(routes.signIn);
  }

  return <TaskDetailClient />;
};

export default TaskDetail;
