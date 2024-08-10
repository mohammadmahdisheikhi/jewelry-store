import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  phonenumber: string;
  ID: string;
  IDscan: File | null;
  password: string;
}

export default function Register(): JSX.Element {
  const initialValues: RegisterFormValues = { firstname: '', lastname: '', phonenumber: '', ID: '', IDscan: null, password: '' };
  
  const validationSchema: Yup.ObjectSchema<RegisterFormValues> = Yup.object({
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    phonenumber: Yup.string().required('Required'),
    ID: Yup.string().required('Required'),
    IDscan: Yup.mixed<File>()
      .nullable()
      .required('Required')
      .test(
        'fileSize',
        'The file is too large',
        (value) => value === null || (value && value.size <= 5 * 1024 * 1024) // 5MB
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value === null || (value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type))
      ),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
  });

  const handleSubmit = (values: RegisterFormValues, actions: any) => {
    console.log('Register:', values);
    actions.setSubmitting(false);
  };

  const fields = [
    { name: 'firstname' as keyof RegisterFormValues, type: 'text', label: 'نام' },
    { name: 'lastname' as keyof RegisterFormValues, type: 'text', label: 'نام خانوادگی' },
    { name: 'phonenumber' as keyof RegisterFormValues, type: 'text', label: 'شماره موبایل' },
    { name: 'ID' as keyof RegisterFormValues, type: 'text', label: 'شماره ملی' },
    { name: 'IDscan' as keyof RegisterFormValues, type: 'file', label: 'اسکن کارت ملی' },
    { name: 'password' as keyof RegisterFormValues, type: 'password', label: 'گذرواژه' },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mx-4 my-8 h-auto">
        <div className="bg-white p-4 rounded-sm shadow-md w-full max-w-md">
          <h2 className="text-2xl font-extrabold text-secondary mb-4 mx-8 ">خوش آمدید، حساب کاربری خود را بسازید.</h2>
          <FormComponent<RegisterFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={fields}
            buttonText="ثبت نام"
          />
          <div className="flex">
            <p className="text-gray-800 mx-8">
                قبلاً ثبت نام کرده‌اید؟
            </p>
            <a href="/login" className="text-secondary font-bold">وارد شوید</a>
          </div>
        </div>
      </div>
    </>
  );
}
