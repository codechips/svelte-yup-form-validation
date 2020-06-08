import * as yup from 'yup';

// simulate a network or database call
const checkUsername = username =>
  new Promise(resolve => {
    const takenUsernames = ['jane', 'john', 'elon', 'foo'];
    const available = !takenUsernames.includes(username);
    // if we return `true` then validation has passed
    setTimeout(() => resolve(available), 500);
  });

const regSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup
    .string()
    .required('Please provide your email')
    .email("Email doesn't look right"),
  username: yup
    .string()
    .required('Username is a manadatory field')
    .test('usernameTaken', 'Please choose another username', checkUsername),
  password: yup.string().required('Password is required'),
  passwordConfirm: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
});

export { regSchema };
