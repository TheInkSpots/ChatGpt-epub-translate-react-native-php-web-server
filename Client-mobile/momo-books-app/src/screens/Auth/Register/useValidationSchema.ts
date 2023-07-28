import * as Yup from 'yup';

export interface FormInputs {
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export const useValidationSchema = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(8, 'Invalid full name'),
    username: Yup.string()
      .required('User is required')
      .min(8, 'Invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'password Invalid'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must be the same')
      .min(8, 'password Invalid'),
  });

  return { validationSchema };
};
