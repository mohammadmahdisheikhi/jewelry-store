import Navbar from "@/components/Navbar";
import Drawer from "@/components/Drawer";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';


interface LogisticFormValues {
    address: string;
    shaba: string;
    postCode: string;
  }

  
export default function Personal(): JSX.Element {

    const initialValues: LogisticFormValues = { address: '', shaba: '', postCode: '' };

    const validationSchema: Yup.ObjectSchema<LogisticFormValues> = Yup.object({
        address: Yup.string().required('Required'),
        shaba: Yup.string().required('Required'),
        postCode: Yup.string().required('Required'),
      });

    const handleSubmit = (values: LogisticFormValues, actions: any) => {
        console.log('data:', values);
        actions.setSubmitting(false);
      };
    
    const fields = [
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
                <span>نام و نام خانوادگی:<p></p></span>
                <span>شماره موبایل:<p></p></span>
                <span>شماره ملی:<p></p></span>
                <span>موجودی حساب کاربری شما:<p></p></span>
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
