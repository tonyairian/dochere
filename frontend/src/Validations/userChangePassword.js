import * as yup from "yup";

export const changePasswordSchema = yup.object({
  password: yup.string().min(4).max(10).required("please enter your password"),
});