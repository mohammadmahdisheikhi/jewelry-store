import React from "react";
import Navbar from "@/components/Navbar";
import UserLoader from "@/components/UserLoader";

interface UserProfile {
	firstname: string;
	lastname: string;
	phonenumber: string;
	IDnumber: string;
	// Add any other fields you expect in the user profile
}

function OrderTrackingBuy({ user }: { user: UserProfile | null }): JSX.Element {
	if (!user) {
		return <div>Loading...</div>; // Loading state while the user data is being fetched
	}

	return (
		<>
			<Navbar />
			<div className="mx-4 md:mx-8 lg:mx-20 my-10 gap-6 md:space-x-4">
				<div>
					<h6 className="text-2xl md:text-3xl text-secondary font-extrabold mb-8">
						سفارش‌های شما
					</h6>
					<p className="text-gray-800 mb-8">
						در این بخش می‌توانید وضعیت سفارش‌های خود را پیگیری کنید.
					</p>
				</div>
				<div className="md:flex border border-[1.5px] border-secondary rounded-sm gap-6 space-y-4 p-4">
					<div className="md:max-w-[200px] md:w-1/3 aspect-square">
						<img src="/image1.png" alt="" />
					</div>
					<div className="md:w-2/3">
						<h6>عنوان سفارش</h6>
						<span className="font-light text-gray-600 my-4">نوع:</span> <br />
						<span className="font-light text-gray-600 my-4">وزن:</span> <br />
						<span className="font-light text-gray-600 my-4">مکان:</span> <br />
						<span className="font-light text-gray-600 my-4">قیمت:</span> <br />
					</div>
				</div>
				<div className="my-4">
					<span className="font-light text-gray-600 my-4">
						نام و نام خانوادگی خریدار:
					</span>{" "}
					<br />
					<span className="font-light text-gray-600 my-4">نشانی:</span> <br />
					<span className="font-light text-gray-600 my-4">کد پستی:</span> <br />
					<span className="font-light text-gray-600 my-4"></span> <br />
				</div>
				<div className="flex justify-between my-6 py-2 border-t-[1.5px] border-secondary">
					<p className="font-light text-gray-800">مجموع قابل پرداخت:</p>
					<p className="font-black text-black">35/000/000 تومان</p>
				</div>
				<div className="flex justify-center mb-6">
					<a
						href="/paymentSuccess"
						className="bg-button hover:bg-buttonHover text-white px-6 py-2 mt-4"
					>
						پرداخت و ادامه فرایند خرید
					</a>
				</div>
			</div>
		</>
	);
}

export default function OrderTrackingBuyPage(): JSX.Element {
	return <UserLoader>{(user) => <OrderTrackingBuy user={user} />}</UserLoader>;
}
