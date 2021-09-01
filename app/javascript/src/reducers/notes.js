let ID_COUNTER = 3;

const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_NOTES": {
      return {
        notes: payload.notes
      };
    }
    case "ADD_NOTE": {
      const { note } = payload;
      ID_COUNTER += 1;
      return {
        notes: [...state.notes, { id: ID_COUNTER, ...note }]
      };
    }
    case "DELETE_NOTE": {
      const notes = state.notes.filter(note => note.id !== payload.note.id);
      return {
        notes
      };
    }
    case "UPDATE_NOTE": {
      const notes = state.notes.map(note =>
        note.id === payload.note.id ? { ...note, ...payload.note } : note
      );
      return { notes };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default notesReducer;
