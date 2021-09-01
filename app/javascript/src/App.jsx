import React from "react";

import { AuthProvider } from "contexts/auth";
import { NotesProvider } from "contexts/notes";
import { UserProvider } from "contexts/user";

import Main from "./components/Main";

const App = props => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotesProvider>
          <Main {...props} />
        </NotesProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
