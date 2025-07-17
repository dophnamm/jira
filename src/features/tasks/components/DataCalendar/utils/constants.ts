import { ETaskStatus } from "@/models";

export const statusColorMap: Record<ETaskStatus, string> = {
  [ETaskStatus.BACKLOG]: "border-l-pink-500",
  [ETaskStatus.TODO]: "border-l-red-500",
  [ETaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [ETaskStatus.IN_REVIEW]: "border-l-blue-500",
  [ETaskStatus.DONE]: "border-l-emerald-500",
};
