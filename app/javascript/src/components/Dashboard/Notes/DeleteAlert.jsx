import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";

import { useNotesDispatch } from "contexts/notes";

export default function DeleteAlert({ onClose, selectedNote }) {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useNotesDispatch();
  const handleDelete = async () => {
    try {
      setDeleting(true);
      // await notesApi.destroy({ ids: selectedNoteIds });
      dispatch({
        type: "DELETE_NOTE",
        payload: {
          note: selectedNote
        }
      });
      Toastr.success("Note has been deleted successfully!");
      onClose();
      // refetch();
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
