import React from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Formik, Form, Field } from "formik";
import { Button, DateInput, Toastr } from "neetoui";
import { Input, Textarea, Select, Switch } from "neetoui/formik";

import { CONTACT_OPTIONS, TAG_OPTIONS } from "constants/dummyData";
import formValidationSchemas from "constants/formValidationSchemas";
import { useNotesDispatch } from "contexts/notes";

dayjs.extend(customParseFormat);

const getEditableNote = note => ({
  ...note,
  tags: getOption(note.tags),
  contact: getOption(note.contact),
  dueDate: dayjs(note.dueDate, "MMM DD, YYYY", true).toDate()
});

const getOption = value => ({ label: value, value });

export default function NewNoteForm({ onClose, selectedNote }) {
  const dispatch = useNotesDispatch();
  const editableNote = selectedNote.id ? getEditableNote(selectedNote) : {};
  const handleSubmit = async values => {
    const {
      tags: { value: tags },
      contact: { value: contact },
      dueDate
    } = values;
    const note = {
      ...values,
      tags,
      contact,
      createdDate:
        editableNote.createdDate || dayjs(new Date()).format("MMM DD, YYYY"),
      dueDate: dueDate ? dayjs(dueDate).format("MMM DD, YYYY") : ""
    };
    try {
      if (selectedNote.id) {
        dispatch({
          type: "UPDATE_NOTE",
          payload: { note }
        });
        Toastr.success("Note updated successfully!");
      } else {
        dispatch({
          type: "ADD_NOTE",
          payload: {
            note
          }
        });
        Toastr.success("Note added successfully!");
      }
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        tags: null,
        description: "",
        contact: null,
        addDueDateToNote: selectedNote.dueDate,
        dueDate: null,
        ...editableNote
      }}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newNoteForm}
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-6">
          <Input label="Title" name="title" />
          <Select
            label="Tags"
            value={values.tags}
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="tags"
            options={TAG_OPTIONS}
          />
          <Textarea label="Description" name="description" rows={8} />
          <Select
            label="Assigned Contact"
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="contact"
            options={CONTACT_OPTIONS}
          />
          <div className="flex justify-between">
            <label htmlFor="addDueDateToNote">Add Due Date to Note</label>
            <Switch name="addDueDateToNote" />
          </div>
          {values.addDueDateToNote && (
            <Field name="dueDate">
              {({ field: { name, value }, form }) => (
                <DateInput
                  minDate={selectedNote.id ? undefined : new Date()}
                  label="Due Date"
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={newDate => form.setFieldValue(name, newDate)}
                />
              )}
            </Field>
          )}
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
