import Navbar from "@/components/Navbar";
import Drawer from "@/components/Drawer";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';
import UserLoader from "@/components/UserLoader";

interface UserProfile {
  firstname: string;
  lastname: string;
  phonenumber: string;
  IDnumber: string;
  // Add any other fields you expect in the user profile
}

interface LogisticFormValues {
    city: string;
    address: string;
    shaba: string;
    postCode: string;
  }

  
function Profile({ user }: { user: UserProfile | null }): JSX.Element {
    if (!user) {
      return <div>Loading...</div>; // Loading state while the user data is being fetched
    }

    console.log('User Data:', user);

    const initialValues: LogisticFormValues = { address: '', shaba: '', postCode: '', city: '' };

    const validationSchema: Yup.ObjectSchema<LogisticFormValues> = Yup.object({
        city: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        shaba: Yup.string().required('Required'),
        postCode: Yup.string().required('Required'),
      });

    const handleSubmit = (values: LogisticFormValues, actions: any) => {
        console.log('data:', values);
        actions.setSubmitting(false);
      };
    
    const fields = [
        { name: 'city' as keyof LogisticFormValues, type: 'text', label: 'شهر شما' },
        { name: 'address' as keyof LogisticFormValues, type: 'text', label: 'نشانی (نشانی شما برای تامین امنیت خریدها و ارسال آن‌ها ضروری است.)' },
        { name: 'shaba' as keyof LogisticFormValues, type: 'text', label: 'شماره شبا (به منظور واریز مبالغ فروش و عودت وجه در صورت نیاز.)' },
        { name: 'postCode' as keyof LogisticFormValues, type: 'text', label: 'کد پستی (به منطور تأیید نشانی)' }
      ];



  return (
    <>
      <Navbar />
      <div className="mx-4 md:mx-8 lg:mx-20 my-10">
        <div className="mb-8">
            <h3 className="text-2xl md:text-3xl text-secondary font-extrabold mb-2">
                 اطلاعات شخصی
            </h3>
            <p className="text-gray-800">
                در این قسمت می‌توانید اطلاعات شخصی خود را مشاهده و ویرایش کنید.
            </p>
        </div>
        <div className="md:grid grid-cols-2 md:gap-8 space-y-4 md:space-y-0">
            <div>
                <span className="flex gap-2 text-gray-800">نام و نام خانوادگی:<p className="text-black font-medium">{user.firstname}{user.lastname}</p></span>
                <span className="flex gap-2 text-gray-800">شماره موبایل:<p className="text-black font-medium">{user.phonenumber}</p></span>
                <span className="flex gap-2 text-gray-800">شماره ملی:<p className="text-black font-medium">{user.IDnumber}</p></span>
                <span className="flex gap-2 text-gray-800">موجودی حساب کاربری شما:<p className="text-black font-medium"></p></span>
            </div>
            <div>
                <FormComponent<LogisticFormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                fields={fields}
                buttonText="ثبت"
                />
            </div>
        </div>
      </div>
    </>
  );
}


export default function Personal(): JSX.Element {
  return (
    <UserLoader>
      {(user) => <Profile user={user} />}
    </UserLoader>
  );
}