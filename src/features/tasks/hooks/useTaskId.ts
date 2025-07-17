import { useParams } from "next/navigation";

export const useTaskId = () => {
  const params = useParams();
  const taskId = params.taskId as string;

  return taskId;
};
