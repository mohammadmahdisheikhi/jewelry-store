import React from "react";
import Navbar from "@/components/Navbar";
import { useGlobalState } from "@/components/GlobalStateContext";
import UserLoader from "@/components/UserLoader";

interface UserProfile {
	firstname: string;
	lastname: string;
	phonenumber: string;
	IDnumber: string;
	// Add any other fields you expect in the user profile
}

function Cart({ user }: { user: UserProfile | null }): JSX.Element {
	if (!user) {
		return <div>Loading...</div>; // Loading state while the user data is being fetched
	}

	const { cart } = useGlobalState();

	return (
		<>
			<Navbar />
			<div className="mx-4 md:mx-8 lg:mx-20 my-10 gap-6 md:space-x-4">
				<div>
					<h6 className="text-2xl md:text-3xl text-secondary font-extrabold mb-8">
						سبد خرید شما
					</h6>
				</div>
				{cart.length === 0 ? (
					<p>سبد خرید شما خالی است.</p>
				) : (
					cart.map((product, index) => (
						<div
							key={index}
							className="md:flex border border-[1.5px] border-secondary rounded-sm gap-6 space-y-4 p-4"
						>
							<div className="md:max-w-[200px] md:w-1/3 aspect-square">
								<img src={product.images[0]} alt={product.title} />
							</div>
							<div className="md:w-2/3">
								<h6>{product.title}</h6>
								<span className="font-light text-gray-600 my-4">
									نوع: {product.type}
								</span>{" "}
								<br />
								<span className="font-light text-gray-600 my-4">
									وزن: {product.weight}
								</span>{" "}
								<br />
								<span className="font-light text-gray-600 my-4">
									مکان: {product.location}
								</span>{" "}
								<br />
								<span className="font-light text-gray-600 my-4">
									قیمت: {product.price}
								</span>{" "}
								<br />
								<a
									href={`/product/${product.id}`}
									className="text-sm font-extrabold text-secondary mt-4"
								>
									مشاهده آگهی
								</a>
							</div>
						</div>
					))
				)}
				{/* Additional UI for total price, buyer info, etc. */}
			</div>
		</>
	);
}

export default function CartPage(): JSX.Element {
	return <UserLoader>{(user) => <Cart user={user} />}</UserLoader>;
}
