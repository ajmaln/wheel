import React from "react";

import PropTypes from "prop-types";

import contactsReducer from "reducers/contacts";

const initialState = { contacts: [] };

const ContactsStateContext = React.createContext(initialState);
const ContactsDispatchContext = React.createContext();

const ContactsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(contactsReducer, initialState);
  return (
    <ContactsStateContext.Provider value={state}>
      <ContactsDispatchContext.Provider value={dispatch}>
        {children}
      </ContactsDispatchContext.Provider>
    </ContactsStateContext.Provider>
  );
};

const useContactsState = () => {
  const context = React.useContext(ContactsStateContext);
  if (context === undefined) {
    throw new Error("useContactsState must be used within a ContactsProvider");
  }
  return context;
};

const useContactsDispatch = () => {
  const context = React.useContext(ContactsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useContactsDispatch must be used within a ContactsProvider"
    );
  }
  return context;
};

const useContacts = () => {
  return [useContactsState(), useContactsDispatch()];
};

ContactsProvider.propTypes = {
  children: PropTypes.node
};

export { ContactsProvider, useContactsState, useContactsDispatch, useContacts };
