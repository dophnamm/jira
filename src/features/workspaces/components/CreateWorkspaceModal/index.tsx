"use client";

import ResponsiveModal from "@/components/ResponsiveModal";

import CreateWorkspaceForm from "../CreateWorkspaceForm";
import { useCreateWorkspaceModal } from "../../hooks/useCreateWorkspaceModal";

const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={onClose} />
    </ResponsiveModal>
  );
};

export default CreateWorkspaceModal;
