import React from "react";

import PropTypes from "prop-types";

import notesReducer from "reducers/notes";

const initialState = { notes: [] };

const NotesStateContext = React.createContext(initialState);
const NotesDispatchContext = React.createContext();

const NotesProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(notesReducer, initialState);
  return (
    <NotesStateContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesStateContext.Provider>
  );
};

const useNotesState = () => {
  const context = React.useContext(NotesStateContext);
  if (context === undefined) {
    throw new Error("useNotesState must be used within a NotesProvider");
  }
  return context;
};

const useNotesDispatch = () => {
  const context = React.useContext(NotesDispatchContext);
  if (context === undefined) {
    throw new Error("useNotesDispatch must be used within a NotesProvider");
  }
  return context;
};

const useNotes = () => {
  return [useNotesState(), useNotesDispatch()];
};

NotesProvider.propTypes = {
  children: PropTypes.node
};

export { NotesProvider, useNotesState, useNotesDispatch, useNotes };
