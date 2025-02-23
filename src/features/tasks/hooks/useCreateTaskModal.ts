import { useQueryState, parseAsBoolean } from "nuqs";

import { params } from "@/utils";

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    params.createTask,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    onOpen,
    onClose,
  };
};
