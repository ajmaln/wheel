import React from "react";

import { Formik, Form, Field } from "formik";
import { Button, DateInput } from "neetoui";
import { Input, Textarea, Select, Switch } from "neetoui/formik";

import notesApi from "apis/notes";
import formValidationSchemas from "constants/formValidationSchemas";

export const TAG_OPTIONS = [
  { value: "Internal", label: "Internal" },
  { value: "Agile Workflow", label: "Agile Workflow" },
  { value: "Bug", label: "Bug" }
];

export const CONTACT_OPTIONS = [
  { value: "Karthik Menon", label: "Karthik Menon" },
  { value: "Ajmal Noushad", label: "Ajmal Noushad" }
];

export default function NewNoteForm({ onClose, refetch }) {
  const handleSubmit = async values => {
    const {
      tags: { value: tags },
      contact: { value: contact }
    } = values;
    try {
      await notesApi.create({
        ...values,
        tags,
        contact
      });
      refetch();
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
        addDueDateToNote: false,
        dueDate: new Date()
      }}
      onSubmit={handleSubmit}
      validationSchema={formValidationSchemas.newNoteForm}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Input label="Title" name="title" className="mb-6" />
          <Select
            label="Tags"
            value={values.tags}
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="tags"
            options={TAG_OPTIONS}
            className="mb-6"
          />
          <Textarea
            label="Description"
            name="description"
            rows={8}
            className="mb-6"
          />
          <Select
            label="Assigned Contact"
            placeholder="Select an Option"
            isDisabled={false}
            isClearable={true}
            isSearchable={true}
            name="contact"
            options={CONTACT_OPTIONS}
            className="mb-6"
          />
          <div className="flex mb-6 justify-between">
            <label htmlFor="addDueDateToNote">Add Due Date to Note</label>
            <Switch name="addDueDateToNote" />
          </div>
          {values.addDueDateToNote && (
            <Field name="dueDate">
              {({ field: { name, value, onChange } }) => (
                <DateInput
                  minDate={new Date()}
                  label="Due Date"
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={newDate =>
                    onChange({ target: { value: newDate, name } })
                  }
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
