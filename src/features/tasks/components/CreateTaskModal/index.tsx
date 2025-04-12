"use client";

import ResponsiveModal from "@/components/ResponsiveModal";

import { useCreateTaskModal } from "../../hooks/useCreateTaskModal";
import TaskFormWrapper from "../TaskFormWrapper";

const CreateTaskModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <TaskFormWrapper taskId={null} onCancel={onClose} />
      </div>
    </ResponsiveModal>
  );
};

export default CreateTaskModal;
