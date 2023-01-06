import * as yup from "yup";

export const productSchema = yup
  .object({
    title: yup.string().required(),
    category: yup
      .string()
      .oneOf(["smartphones", "laptops"], "Select a category"),
    price: yup.number().required().typeError("Must be a number"),
    image: yup.mixed(),
    description: yup.string().required(),
  })
  .required();
