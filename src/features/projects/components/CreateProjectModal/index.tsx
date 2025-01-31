"use client";

import ResponsiveModal from "@/components/ResponsiveModal";

import CreateProjectForm from "../CreateProjectForm";
import { useCreateProjectModal } from "../../hooks/useCreateProjectModal";

const CreateProjectModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={onClose} />
    </ResponsiveModal>
  );
};

export default CreateProjectModal;
