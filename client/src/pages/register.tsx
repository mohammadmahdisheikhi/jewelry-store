import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  phonenumber: string;
  IDnumber: string;
  password: string;
}

export default function Register(): JSX.Element {
  const initialValues: RegisterFormValues = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    IDnumber: '',
    password: '',
  };
  
  const validationSchema: Yup.ObjectSchema<RegisterFormValues> = Yup.object({
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    phonenumber: Yup.string().required('Required'),
    IDnumber: Yup.string().required('Required'),  // Match this with backend expectations
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),  // Make sure this aligns with backend validation
  });

  const handleSubmit = async (values: RegisterFormValues, actions: any) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Cookies.set('access_token', response.data.access, { expires: 1 });
      Cookies.set('refresh_token', response.data.refresh, { expires: 7 });

      window.location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration error:', error.response?.data);
        toast.error('Registration failed. Please check your details and try again.');
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('An unknown error occurred. Please try again later.');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  const fields = [
    { name: 'firstname' as keyof RegisterFormValues, type: 'text', label: 'First Name' },
    { name: 'lastname' as keyof RegisterFormValues, type: 'text', label: 'Last Name' },
    { name: 'phonenumber' as keyof RegisterFormValues, type: 'text', label: 'Phone Number' },
    { name: 'IDnumber' as keyof RegisterFormValues, type: 'text', label: 'ID Number' },  // Adjusted name to match backend
    { name: 'password' as keyof RegisterFormValues, type: 'password', label: 'Password' },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mx-4 my-8 h-auto">
        <div className="bg-white p-4 rounded-sm shadow-md w-full max-w-md">
          <h2 className="text-2xl font-extrabold text-secondary mb-4 mx-8 ">Welcome, create your account.</h2>
          <FormComponent<RegisterFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={fields}
            buttonText="Register"
          />
          <div className="flex">
            <p className="text-gray-800 mx-8">
                Already registered?
            </p>
            <a href="/login" className="text-secondary font-bold">Login</a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
