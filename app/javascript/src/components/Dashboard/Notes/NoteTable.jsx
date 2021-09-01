import React from "react";

import { Avatar, Checkbox, Badge, Tooltip, Button } from "neetoui";

const getBadgeColor = text => {
  switch (text) {
    case "Internal":
      return "blue";
    case "Agile Workflow":
      return "green";
    case "Bug":
      return "red";
    default:
      return "blue";
  }
};

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  onDelete
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Title</th>
            <th className="text-center">Description</th>
            <th className="text-left">Tags</th>
            <th className="text-left">Created Date</th>
            <th className="text-left">Due Date</th>
            <th className="text-left">Contact</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedNoteIds.indexOf(note.id);

                    if (index > -1) {
                      setSelectedNoteIds([
                        ...selectedNoteIds.slice(0, index),
                        ...selectedNoteIds.slice(index + 1)
                      ]);
                    } else {
                      setSelectedNoteIds([...selectedNoteIds, note.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-gray-900">
                  {note.title}
                </div>
              </td>
              <td>{note.description}</td>
              <td>
                <Badge color={getBadgeColor(note.tags)}>{note.tags}</Badge>
              </td>
              <td>{note.createdDate}</td>
              <td>{note.dueDate || "--"}</td>
              <td>
                <Avatar size={36} contact={{ name: note.contact }} />
              </td>
              <td>
                <div className="flex space-x-3">
                  <Tooltip content="Edit" position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button style="icon" icon="ri-delete-bin-line" />
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
