"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

const WorkspaceDetail = () => {
  const workspaceId = useWorkspaceId();

  return <div>WorkspaceDetail - {workspaceId}</div>;
};

export default WorkspaceDetail;
