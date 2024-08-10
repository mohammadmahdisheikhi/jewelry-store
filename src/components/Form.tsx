import { Formik, Field, Form, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';

interface FormField<T> {
  name: keyof T;
  type: string;
  label: string;
  placeholder?: string;
}

interface FormComponentProps<T extends FormikValues> {
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  onSubmit: (values: T, actions: any) => void;
  fields: FormField<T>[];
  buttonText: string;
}

export default function FormComponent<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  buttonText
}: FormComponentProps<T>) {
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="bg-white p-8 rounded-[2px] w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              {fields.map((field) => (
                <div key={String(field.name)} className="mb-4">
                  <label htmlFor={String(field.name)} className="block text-gray-700">
                    {field.label}
                  </label>
                  {field.type === 'file' ? (
                    <input
                      type="file"
                      name={String(field.name)}
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          setFieldValue(field.name, event.currentTarget.files[0]);
                        }
                      }}
                      className='w-full h-10 border-primary border border-[1.5px] focus:border-secondary mt-2 p-2 bg-gray-50 outline-none '
                    />
                  ) : (
                    <Field
                      type={field.type}
                      name={String(field.name)}
                      placeholder={field.placeholder}
                      className='w-full h-10 border-primary border border-[1.5px] focus:border-secondary mt-2 p-2 bg-gray-50 outline-none '
                    />
                  )}
                  <ErrorMessage name={String(field.name)} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-button hover:bg-buttonHover text-white px-6 py-2 mt-4"
                  disabled={isSubmitting}
                >
                  {buttonText}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
