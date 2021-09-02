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
  onDelete,
  onEdit
}) {
  return (
    <div className="w-full p-12">
      <table className="nui-table nui-table--checkbox nui-table--actions nui-table--hover table-fixed">
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
            <th className="text-center">Tags</th>
            <th className="text-center">Created Date</th>
            <th className="text-center">Due Date</th>
            <th className="text-center">Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id}>
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
                <Button
                  style="link"
                  label={
                    <span className="text-left truncate overflow-ellipsis w-32">
                      {note.title}
                    </span>
                  }
                />
              </td>
              <td className="text-center truncate overflow-ellipsis w-32">
                {note.description}
              </td>
              <td className="text-center">
                <Badge color={getBadgeColor(note.tags)}>{note.tags}</Badge>
              </td>
              <td className="text-center">{note.createdDate}</td>
              <td className="text-center">{note.dueDate || "--"}</td>
              <td className="text-center flex justify-center">
                <Avatar size={36} contact={{ name: note.contact }} />
              </td>
              <td>
                <div className="flex space-x-3">
                  <Tooltip content="Edit" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-pencil-line"
                      onClick={() => onEdit(note)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => onDelete(note)}
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
