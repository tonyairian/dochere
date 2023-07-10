import * as yup from "yup";

export const doctorSignUpschema = yup.object({
  name: yup.string().required("please enter your name"),
  email: yup.string().email().required("please enter your email"),
  number: yup.number().required("please enter your number"),
  password: yup.string().min(4).max(10).required("please enter your password"),
  registrationNumber:yup.string().min(6).max(12).required("please enter Registration Number"),
  experience: yup.string().required('please select experience')
});
