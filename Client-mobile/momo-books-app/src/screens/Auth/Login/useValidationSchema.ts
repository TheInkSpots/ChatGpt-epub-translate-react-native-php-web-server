import * as Yup from 'yup';

export interface FormInputs {
  username: string;
  password: string;
}

export const useValidationSchema = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Please enter a valid username')
      .min(8, 'Please enter a valid username with at least 8 characters'),
    password: Yup.string()
      .required('Please enter a valid password')
      .min(8, 'Please enter a valid password with at least 8 characters'),
  });

  return { validationSchema };
};
