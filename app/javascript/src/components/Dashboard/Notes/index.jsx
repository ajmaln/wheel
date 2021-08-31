import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";

import DeleteAlert from "./DeleteAlert";
import NewNotePane from "./NewNotePane";
import NoteTable from "./NoteTable";

const DATA = [
  {
    id: 1,
    title: "My Task",
    description: "Complete the notes list UI",
    tags: ["Internal"],
    createdDate: "Apr 20, 2021",
    dueDate: "Apr 30, 2021",
    contact: "Ajmal Noushad"
  },
  {
    id: 2,
    title: "My Second Task",
    description: "Complete the notes list UI with different tag",
    tags: ["Agile Workflow"],
    createdDate: "Apr 20, 2021",
    dueDate: "Apr 30, 2021",
    contact: "Ajmal Noushad"
  },
  {
    id: 3,
    title: "My Third Task",
    description: "Complete the notes list UI with bug tag, but ",
    tags: ["Bug"],
    createdDate: "Apr 20, 2021",
    dueDate: "",
    contact: "Ajmal Noushad"
  }
];

const SORT_BY_OPTIONS = [
  { label: "Title", value: "title" },
  { label: "Created Date", value: "createdDate" },
  { label: "Due Date", value: "dueDate" }
];

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      // Simulate API loading delay
      const getNotes = () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ data: { notes: DATA } }), 500)
        );
      const response = await getNotes();
      setNotes(response.data.notes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Notes"
        actionBlock={
          <Button
            onClick={() => setShowNewNotePane(true)}
            label="Add New Note"
            icon="ri-add-line"
          />
        }
      />
      {notes.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm("")
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedNoteIds.length
            }}
            sortProps={{
              options: SORT_BY_OPTIONS,
              onClick: () => {},
              sortBy: {
                column: SORT_BY_OPTIONS[0].value,
                direction: "desc"
              }
            }}
            paginationProps={{
              count: 100,
              pageNo: 2,
              pageSize: 25,
              navigate: () => {}
            }}
            toggleFilter={() => {}}
          />
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            notes={notes}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any notes!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewNotePane(true)}
          primaryActionLabel="Add New Note"
        />
      )}
      <NewNotePane
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
        fetchNotes={fetchNotes}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchNotes}
        />
      )}
    </>
  );
};

export default Notes;
