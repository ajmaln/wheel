let ID_COUNTER = 3;

const contactsReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CONTACTS": {
      return {
        contacts: payload.contacts
      };
    }
    case "ADD_CONTACT": {
      const { contact } = payload;
      ID_COUNTER += 1;
      return {
        contacts: [...state.contacts, { id: ID_COUNTER, ...contact }]
      };
    }
    case "DELETE_CONTACT": {
      const contacts = state.contacts.filter(
        contact => contact.id !== payload.contact.id
      );
      return {
        contacts
      };
    }
    case "UPDATE_CONTACT": {
      const contacts = state.contacts.map(contact =>
        contact.id === payload.contact.id
          ? { ...contact, ...payload.contact }
          : contact
      );
      return { contacts };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default contactsReducer;
