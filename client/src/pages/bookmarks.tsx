// pages/Bookmarks.tsx
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useGlobalState } from "@/components/GlobalStateContext";
import UserLoader from "@/components/UserLoader";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ProductProps } from "./product";

interface UserProfile {
	firstname: string;
	lastname: string;
	phonenumber: string;
	IDnumber: string;
	createdAt: string;
	imageUrl: string;
	// Add any other fields you expect in the user profile
}

function Bookmarks({ user }: { user: UserProfile | null }): JSX.Element {
	const { bookmarks, addToBookmarks } = useGlobalState();

	if (!user) {
		return <div>Loading...</div>; // Loading state while the user data is being fetched
	}

	async function handleGetBookmarks() {
		const token = Cookies.get("access_token");
		try {
			const response = await fetch("http://localhost:8000/ad/bookmarks/", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			// biome-ignore lint/complexity/noForEach: <explanation>
			data.forEach((element: ProductProps) => {
				addToBookmarks(element);
			});

			if (response.ok) {
				toast.success("Ad bookmarked successfully!");
			} else {
				toast.error("Failed to bookmark the ad.");
			}
		} catch (error) {
			toast.error("An error occurred while bookmarking the ad.");
			console.error("Error bookmarking ad:", error);
		}
	}

	useEffect(() => {
		handleGetBookmarks();
	}, []);

	return (
		<>
			<Navbar />
			<div className="w-auto mx-4 md:mx-8 lg:mx-20 my-10 gap-6 md:space-x-4">
				<div>
					<h6 className="text-2xl md:text-3xl text-secondary font-extrabold">
						آگهی‌های نشان شده
					</h6>
				</div>
				<div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0 w-auto mt-8">
					{bookmarks.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							title={product.title}
							price={product.price}
							location={product.location}
							createdAt={product.createdAt}
							imageUrl={product.imageUrl}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default function BookmarksPage(): JSX.Element {
	return <UserLoader>{(user) => <Bookmarks user={user} />}</UserLoader>;
}
