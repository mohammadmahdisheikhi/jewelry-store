import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Form";
import * as Yup from 'yup';

interface AdForm {
    title: string,
    image: string,
    type: string,
    weight: string,
    carat: string,
    price: string,
}

export default function AddAd(): JSX.Element {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialValues: AdForm = { title: '', image: '', type: '', weight: '', carat: '', price: '' };
    const validationSchema: Yup.ObjectSchema<AdForm> = Yup.object({
        title: Yup.string().required('Required'),
        image: Yup.string().required('Required'),
        type: Yup.string().required('Required'),
        weight: Yup.string().required('Required'),
        carat: Yup.string().required('Required'),
        price: Yup.string().required('Required'),
    });

    const handleSubmit = (values: AdForm, actions: any) => {
        console.log('Ad Submitted:', values);
        actions.setSubmitting(false);
        setIsSubmitted(true);
    };

    const fields = [
        { name: 'title' as keyof AdForm, type: 'text', label: 'عنوان آگهی' },
        { name: 'image' as keyof AdForm, type: 'file', label: 'عکس طلا' },
        { name: 'type' as keyof AdForm, type: 'text', label: 'نوع طلا (برای مثال، گوشواره، زنجیر، ...)' },
        { name: 'weight' as keyof AdForm, type: 'text', label: 'وزن طلا' },
        { name: 'carat' as keyof AdForm, type: 'text', label: 'عیار' },
        { name: 'price' as keyof AdForm, type: 'text', label: 'قیمت (پس از خرید و واریز وجه توسط خریدار، پلتفرم 2 درصد کمیسیون کسر می‌کند).' },
    ];

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mx-4 my-8 mt-8">
                <div className="bg-white p-4 rounded-sm shadow-md w-full max-w-md">
                    {isSubmitted ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-extrabold text-green-600 mx-8 mt-4">
                                آگهی با موفقیت ثبت شد
                            </h2>
                            <button
                                className="mt-8 bg-button hover:bg-buttonHover text-white px-6 py-2 rounded-[2px]"
                                onClick={() => {window.location.href = '/product'
                                    console.log('Viewing Ad');
                                }}
                            >
                                مشاهده آگهی
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-extrabold text-secondary mx-8 mt-4">
                                اطلاعات آگهی خود را وارد کنید.
                            </h2>
                            <FormComponent<AdForm>
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                fields={fields}
                                buttonText="ثبت آگهی"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
