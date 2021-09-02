import React from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Formik, Form } from "formik";
import { Button, Toastr } from "neetoui";
import { Input, Select, Switch } from "neetoui/formik";

import { DEPARTMENT_OPTIONS } from "constants/dummyData";
import formValidationSchemas from "constants/formValidationSchemas";
import { useContactsDispatch } from "contexts/contacts";

dayjs.extend(customParseFormat);

const getEditableContact = contact => ({
  ...contact,
  department: getOption(contact.department)
});

const getOption = value => ({ label: value, value });

export default function NewContactForm({ onClose, selectedContact }) {
  const dispatch = useContactsDispatch();
  const editableContact = selectedContact.id
    ? getEditableContact(selectedContact)
    : {};
  const handleSubmit = async values => {
    const contact = {
      ...values,
      department: values.department.value
    };
    try {
      if (selectedContact.id) {
        dispatch({
          type: "UPDATE_CONTACT",
          payload: { contact }
        });
        Toastr.success("Contact updated successfully!");
      } else {
        dispatch({
          type: "ADD_CONTACT",
          payload: {
            contact
          }
        });
        Toastr.success("Contact added successfully!");
      }
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        department: null,
        contactNumber: "",
        addToBasecamp: false,
        ...editableContact
      }}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newContactForm}
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-6">
          <Input label="Name" name="name" />
          <Input label="Email" name="email" />
          <Input label="Contact Number" name="contactNumber" />
          <Select
            label="Department"
            value={values.department}
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="department"
            options={DEPARTMENT_OPTIONS}
          />
          <div className="flex justify-between">
            <label htmlFor="addToBasecamp">Add to Basecamp</label>
            <Switch name="addToBasecamp" />
          </div>

          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
