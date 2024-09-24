import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import FormComponent from "@/components/Form";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserLoader from "@/components/UserLoader";
import Cookies from "js-cookie";

interface UserProfile {
	firstname: string;
	lastname: string;
	phonenumber: string;
	IDnumber: string;
	// Add any other fields you expect in the user profile
}

interface AdForm {
	title: string;
	images: File[]; // Array of files
	receipt_image: File | null; // Single file for receipt image
	type: string;
	weight: string;
	carat: string;
	price: string;
}

function Addad({ user }: { user: UserProfile | null }): JSX.Element {
	if (!user) {
		return <div>Loading...</div>; // Loading state while the user data is being fetched
	}

	const [isSubmitted, setIsSubmitted] = useState(false);

	const initialValues: AdForm = {
		title: "",
		images: [],
		receipt_image: null,
		type: "",
		weight: "",
		carat: "",
		price: "",
	};

	const validationSchema: Yup.ObjectSchema<AdForm> = Yup.object({
		title: Yup.string().required("Required"),
		images: Yup.array()
			.of(
				Yup.mixed<File>()
					.required("A file is required")
					.test("fileType", "Unsupported File Format", (value) => {
						return (
							value &&
							["image/jpeg", "image/png", "image/gif"].includes(value.type)
						);
					}),
			)
			.min(1, "At least one image is required")
			.required("Required"),
		receipt_image: Yup.mixed<File>()
			.required("A file is required")
			.test("fileType", "Unsupported File Format", (value) => {
				return (
					value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
				);
			}),
		type: Yup.string().required("Required"),
		weight: Yup.string().required("Required"),
		carat: Yup.string().required("Required"),
		price: Yup.string().required("Required"),
	});

	const handleSubmit = async (values: AdForm, actions: any) => {
		actions.setSubmitting(false);
		setIsSubmitted(true);

		try {
			// Create a FormData object to handle the file upload
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("type", values.type);
			formData.append("weight", values.weight);
			formData.append("carat", values.carat);
			formData.append("price", values.price);

			// Append each image file to the formData
			if (values.images && values.images.length > 0) {
				values.images.forEach((image, index) => {
					formData.append("images", image, image.name);
				});
			}

			// Append the receipt image to the formData
			if (values.receipt_image) {
				formData.append(
					"receipt_image",
					values.receipt_image,
					values.receipt_image.name,
				);
			}

			// Retrieve the authentication token from cookies
			const token = Cookies.get("access_token"); // Assuming the token is stored in a cookie named 'access_token'

			// Post the formData to your backend
			const response = await axios.post(
				"http://localhost:8000/ad/create",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`, // Include the token in the Authorization header
					},
				},
			);

			// Redirect to the profile page after successful ad creation
			// window.location.href = '/profile';
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error("Failed to create the ad. Please try again.");
				console.error("Ad creation error:", error.response?.data);
			} else {
				console.error("An unknown error occurred:", error);
			}
		} finally {
			actions.setSubmitting(false);
		}
	};

	const fields = [
		{ name: "title" as keyof AdForm, type: "text", label: "عنوان آگهی" },
		{
			name: "images" as keyof AdForm,
			type: "file",
			label: "عکس طلا",
			multiple: true,
		}, // Enable multiple files
		{
			name: "receipt_image" as keyof AdForm,
			type: "file",
			label: "عکس کاغذ خرید",
		}, // Field for receipt image
		{
			name: "type" as keyof AdForm,
			type: "text",
			label: "نوع طلا (برای مثال، گوشواره، زنجیر، ...)",
		},
		{ name: "weight" as keyof AdForm, type: "text", label: "وزن طلا" },
		{ name: "carat" as keyof AdForm, type: "text", label: "عیار" },
		{
			name: "price" as keyof AdForm,
			type: "text",
			label:
				"قیمت (پس از خرید و واریز وجه توسط خریدار، پلتفرم 2 درصد کمیسیون کسر می‌کند).",
		},
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
								onClick={() => {
									window.location.href = "/product";
								}}
							>
								مشاهده آگهی
							</button>
						</div>
					) : (
						<>
							<div className="mx-8 mt-4">
								<h2 className="text-2xl font-extrabold text-secondary">
									اطلاعات آگهی خود را وارد کنید.
								</h2>
								<p className="text-gray-800 my-4 font-medium">
									شما در حال انتشار یک آگهی جدید هستید!
								</p>
							</div>
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

export default function Personal(): JSX.Element {
	return <UserLoader>{(user) => <Addad user={user} />}</UserLoader>;
}
