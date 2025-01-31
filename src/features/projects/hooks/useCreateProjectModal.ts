import { useQueryState, parseAsBoolean } from "nuqs";

import { params } from "@/utils";

export const useCreateProjectModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    params.createProject,
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
