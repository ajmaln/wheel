export const NOTES = [
  {
    id: 1,
    title: "My Task",
    description: "Complete the notes list UI",
    tags: "Internal",
    createdDate: "Apr 20, 2021",
    dueDate: "Apr 30, 2021",
    contact: "Ajmal Noushad"
  },
  {
    id: 2,
    title: "My Second Task",
    description: "Complete the notes list UI with different tag",
    tags: "Agile Workflow",
    createdDate: "Apr 20, 2021",
    dueDate: "Apr 30, 2021",
    contact: "Ajmal Noushad"
  },
  {
    id: 3,
    title: "My Third Task",
    description:
      "Complete the notes list UI with bug tag, but without due date.",
    tags: "Bug",
    createdDate: "Apr 20, 2021",
    dueDate: "",
    contact: "Ajmal Noushad"
  }
];

export const SORT_BY_OPTIONS = [
  { label: "Title", value: "title" },
  { label: "Created Date", value: "createdDate" },
  { label: "Due Date", value: "dueDate" }
];
