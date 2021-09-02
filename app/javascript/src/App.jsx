import React from "react";

import { AuthProvider } from "contexts/auth";
import { ContactsProvider } from "contexts/contacts";
import { NotesProvider } from "contexts/notes";
import { UserProvider } from "contexts/user";

import Main from "./components/Main";

const App = props => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotesProvider>
          <ContactsProvider>
            <Main {...props} />
          </ContactsProvider>
        </NotesProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
