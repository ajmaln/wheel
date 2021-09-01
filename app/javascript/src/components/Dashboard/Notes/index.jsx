import React, { useState, useEffect } from "react";

import EmptyNotesListImage from "images/EmptyNotesList";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";
import { NOTES, SORT_BY_OPTIONS } from "constants/dummyData";
import { useNotesDispatch, useNotesState } from "contexts/notes";

import DeleteAlert from "./DeleteAlert";
import NewNotePane from "./NewNotePane";
import NoteTable from "./NoteTable";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});

  const { notes } = useNotesState();
  const dispatch = useNotesDispatch();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      // Simulate API loading delay
      const getNotes = () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ data: { notes: NOTES } }), 500)
        );
      const response = await getNotes();
      dispatch({
        type: "SET_NOTES",
        payload: { notes: response.data.notes }
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = note => {
    setSelectedNote(note);
    setShowNewNotePane(true);
  };

  const onDelete = note => {
    setSelectedNote(note);
    setShowDeleteAlert(true);
  };

  const onDeleteAlertClose = () => {
    setSelectedNote({});
    setShowDeleteAlert(false);
  };

  const onFormPaneClose = () => {
    setSelectedNote({});
    setShowNewNotePane(false);
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
            onDelete={onDelete}
            onEdit={onEdit}
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
        onClose={onFormPaneClose}
        selectedNote={selectedNote}
      />
      {showDeleteAlert && (
        <DeleteAlert selectedNote={selectedNote} onClose={onDeleteAlertClose} />
      )}
    </>
  );
};

export default Notes;
