import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface LoginFormValues {
  phonenumber: string;
  password: string;
}

export default function Login(): JSX.Element {
  const initialValues: LoginFormValues = { phonenumber: '', password: '' };

  const validationSchema: Yup.ObjectSchema<LoginFormValues> = Yup.object({
    phonenumber: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values: LoginFormValues, actions: any) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/api/token/', {
        phonenumber: values.phonenumber,
        password: values.password,
      });

      // Store the JWT tokens in cookies
      Cookies.set('access_token', response.data.access, { expires: 1 });
      Cookies.set('refresh_token', response.data.refresh, { expires: 7 });

      // Redirect to the profile page after login
      window.location.href = '/profile';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Login failed. Please check your credentials and try again.');
        console.error('Login error:', error.response?.data);
      } else {
        console.error('An unknown error occurred:', error);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const fields = [
    { name: 'phonenumber' as keyof LoginFormValues, type: 'text', label: 'Phone Number' },
    { name: 'password' as keyof LoginFormValues, type: 'password', label: 'Password' },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mx-4 my-8 mt-8">
        <div className="bg-white p-4 rounded-sm shadow-md w-full max-w-md">
          <h2 className="text-2xl font-extrabold text-secondary mx-8">Welcome, log in to your account.</h2>
          <FormComponent<LoginFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={fields}
            buttonText="Login"
          />
          <div className="flex">
            <p className="text-gray-800 mx-8">Not registered yet?</p>
            <a href="/register" className="text-secondary font-bold">Sign up</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
