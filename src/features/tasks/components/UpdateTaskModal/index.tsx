"use client";

import ResponsiveModal from "@/components/ResponsiveModal";

import TaskFormWrapper from "../TaskFormWrapper";

import { useUpdateTaskModal } from "../../hooks/useUpdateTaskModal";

const UpdateTaskModal = () => {
  const { taskId, onClose } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={onClose}>
      <div>
        <TaskFormWrapper taskId={taskId} onCancel={onClose} />
      </div>
    </ResponsiveModal>
  );
};

export default UpdateTaskModal;
