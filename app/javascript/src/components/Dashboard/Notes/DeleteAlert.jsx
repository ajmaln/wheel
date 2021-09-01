import React, { useState } from "react";

import { Alert } from "neetoui";

import notesApi from "apis/notes";

export default function DeleteAlert({ refetch, onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await notesApi.destroy({ ids: selectedNoteIds });
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Alert
      isOpen
      icon="ri-alarm-warning-line text-red-500 ri-lg"
      title="Delete Note"
      message="Are you sure you want to delete the note? All of your data will be permanently removed from our database forever. This action cannot be undone."
      onClose={onClose}
      hideConfirmation
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete
      }}
    />
  );
}
