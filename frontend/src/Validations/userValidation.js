import * as yup from "yup";

export const signUpschema = yup.object({
  name: yup.string().required("please enter your name"),
  email: yup.string().email().required("please enter your email"),
  number: yup.number().required("please enter your number"),
  password: yup.string().min(4).max(10).required("please enter your password"),
});
