import * as yup from "yup";

export const createTaskSchema = yup.object({
  task: yup
    .string()
    .required("Title is required")
    .max(100, "Title should be maximum 100 characters"),
  dealine: yup
    .string()
    .required("Dealine is required")
    .typeError("Dealine must be a Valid"),
  upload_image: yup.mixed().required("Image is required"),
});
