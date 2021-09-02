import React from "react";

import { Pane } from "neetoui";

import NewContactForm from "./NewContactForm";

export default function NewContactPane({ showPane, onClose, selectedContact }) {
  return (
    <Pane title="Create a New Contact" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <NewContactForm onClose={onClose} selectedContact={selectedContact} />
      </div>
    </Pane>
  );
}
