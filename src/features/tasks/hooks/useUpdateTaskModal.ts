import { useQueryState, parseAsString } from "nuqs";

import { params } from "@/utils";

export const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState(params.updateTask, parseAsString);

  const onOpen = (id: string) => setTaskId(id);
  const onClose = () => setTaskId(null);

  return {
    taskId,
    setTaskId,
    onOpen,
    onClose,
  };
};
