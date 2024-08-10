import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';

interface LoginFormValues {
  phonenumber: string;
  password: string;
}

export default function Login(): JSX.Element {
  const initialValues: LoginFormValues = { phonenumber: '', password: '' };
  const validationSchema: Yup.ObjectSchema<LoginFormValues> = Yup.object({
    phonenumber: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
  });

  const handleSubmit = (values: LoginFormValues, actions: any) => {
    console.log('Login:', values);
    actions.setSubmitting(false);
  };

  const fields = [
    { name: 'phonenumber' as keyof LoginFormValues, type: 'text', label: 'شماره موبایل' },
    { name: 'password' as keyof LoginFormValues, type: 'password', label: 'گذرواژه' }
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mx-4 my-8 mt-8">
        <div className="bg-white p-4 rounded-sm shadow-md w-full max-w-md">
          <h2 className="text-2xl font-extrabold text-secondary mx-8">خوش آمدید، وارد حساب کاربری خود شوید.</h2>
          <FormComponent<LoginFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={fields}
            buttonText="ورود"
          />
          <div className="flex">
            <p className="text-gray-800 mx-8">
                قبلاً ثبت نام نکرده‌اید؟
            </p>
            <a href="/register" className="text-secondary font-bold">ثبت نام کنید</a>
          </div>
        </div>
      </div>
    </>
  );
}
