import * as Yup from "yup";

export default {
  loginForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required")
  }),
  resetPasswordForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required")
  }),
  signupForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required")
  }),
  profileForm: Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  }),
  newNoteForm: Yup.object().shape({
    contact: Yup.object()
      .shape({
        label: Yup.string().required("Contact is required"),
        value: Yup.string().required("Contact is required")
      })
      .required("Contact is required")
      .nullable(),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date(),
    tags: Yup.object()
      .shape({
        label: Yup.string().required("Tags is required"),
        value: Yup.string().required("Tags is required")
      })
      .required("Tags is required")
      .nullable(),
    title: Yup.string().required("Title is required")
  }),
  newContactForm: Yup.object().shape({
    addToBasecamp: Yup.boolean(),
    contactNumber: Yup.string().required("Contact Number is required"),
    department: Yup.object()
      .shape({
        label: Yup.string().required("Department is required"),
        value: Yup.string().required("Department is required")
      })
      .required("Department is required")
      .nullable(),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required")
  })
};
