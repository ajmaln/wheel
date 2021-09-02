import React, { useState, useEffect } from "react";

import EmptyNotesList from "images/EmptyNotesList";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";
import { CONTACTS, SORT_BY_OPTIONS } from "constants/dummyData";
import { useContactsDispatch, useContactsState } from "contexts/contacts";

import ContactTable from "./ContactTable";
import DeleteAlert from "./DeleteAlert";
import NewContactPane from "./NewContactPane";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  const { contacts } = useContactsState();
  const dispatch = useContactsDispatch();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      // Simulate API loading delay
      const getContacts = () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ data: { contacts: CONTACTS } }), 500)
        );
      const response = await getContacts();
      dispatch({
        type: "SET_CONTACTS",
        payload: { contacts: response.data.contacts }
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = contact => {
    setSelectedContact(contact);
    setShowNewContactPane(true);
  };

  const onDelete = contact => {
    setSelectedContact(contact);
    setShowDeleteAlert(true);
  };

  const onDeleteAlertClose = () => {
    setSelectedContact({});
    setShowDeleteAlert(false);
  };

  const onFormPaneClose = () => {
    setSelectedContact({});
    setShowNewContactPane(false);
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => setShowNewContactPane(true)}
            label="Add New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm("")
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedContactIds.length
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
          <ContactTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            contacts={contacts}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesList}
          title="Looks like you don't have any contacts!"
          subtitle="Add your contacts to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add New Contact"
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        onClose={onFormPaneClose}
        selectedContact={selectedContact}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedContact={selectedContact}
          onClose={onDeleteAlertClose}
        />
      )}
    </>
  );
};

export default Contacts;
