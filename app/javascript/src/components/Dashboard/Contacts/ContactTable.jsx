import React from "react";

import { Avatar, Checkbox, Tooltip, Button } from "neetoui";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
  onDelete,
  onEdit
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--actions nui-table--hover">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-center">Department</th>
            <th className="text-center">Contact Number</th>
            <th className="text-center">Add to Basecamp</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1)
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id
                      ]);
                    }
                  }}
                />
              </td>
              <td className="flex items-center space-x-3">
                <Avatar size={36} contact={contact} />
                <p>{contact.name}</p>
              </td>
              <td>{contact.email}</td>
              <td className="text-center">{contact.department}</td>
              <td className="text-center">{contact.contactNumber}</td>
              <td>
                <div className="w-4 mx-auto">
                  <Checkbox checked={contact.addToBasecamp} />
                </div>
              </td>
              <td>
                <div className="flex space-x-3">
                  <Tooltip content="Edit" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-pencil-line"
                      onClick={() => onEdit(contact)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => onDelete(contact)}
                    />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
