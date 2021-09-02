import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";

import { useContactsDispatch } from "contexts/contacts";

export default function DeleteAlert({ onClose, selectedContact }) {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useContactsDispatch();
  const handleDelete = async () => {
    try {
      setDeleting(true);
      dispatch({
        type: "DELETE_CONTACT",
        payload: {
          contact: selectedContact
        }
      });
      Toastr.success("Contact has been deleted successfully!");
      onClose();
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
      title="Delete Contact"
      message="Are you sure you want to delete the contact? All of your data will be permanently removed from our database forever. This action cannot be undone."
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
