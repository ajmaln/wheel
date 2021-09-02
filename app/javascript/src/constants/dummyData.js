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

export const TAG_OPTIONS = [
  { value: "Internal", label: "Internal" },
  { value: "Agile Workflow", label: "Agile Workflow" },
  { value: "Bug", label: "Bug" }
];

export const CONTACT_OPTIONS = [
  { value: "Karthik Menon", label: "Karthik Menon" },
  { value: "Ajmal Noushad", label: "Ajmal Noushad" }
];

export const CONTACTS = [
  {
    id: 1,
    name: "Karthik Menon",
    email: "karthik.menon@bigbinary.com",
    contactNumber: "12345678",
    department: "Engineering",
    addToBasecamp: false
  },
  {
    id: 2,
    name: "Ajmal Noushad",
    email: "ajmal.noushad@bigbinary.com",
    contactNumber: "12345678",
    department: "Engineering",
    addToBasecamp: true
  }
];

export const DEPARTMENT_OPTIONS = [
  { value: "Engineering", label: "Engineering" },
  { value: "HR", label: "HR" },
  { value: "Marketing", label: "Marketing" }
];
