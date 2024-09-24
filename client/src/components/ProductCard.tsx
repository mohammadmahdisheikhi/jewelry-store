import React from "react";
import { useRouter } from "next/router";
import ToggleIcon from "./ToggleIcon";
import momentJalaali from "moment-jalaali";

const filledColor = "#A6808C";
const outlineColor = "#B4B0BF";

interface ProductCardProps {
	id: number; // Add an id prop to uniquely identify the product
	title: string;
	price: string;
	location: string;
	createdAt: string;
	imageUrl: Array<{ id: string; image: string }>;
}

export default function ProductCard({
	id,
	title,
	price,
	location,
	createdAt,
	imageUrl,
}: ProductCardProps): JSX.Element {
	const router = useRouter();

	const handleCardClick = () => {
		router.push(`/product/${id}`); // Navigate to the product detail page
	};

	// const date = momentJalaali(createdAt).format("jYYYY/jM/jD");
	const date = momentJalaali(createdAt).format("jYYYY/jM/jD");

	return (
		<div
			className="min-w-full bg-white flex w-[320px] border-[1.5px] border-primary gap-4 rounded-[2px] cursor-pointer shadow-sm"
			onClick={handleCardClick} // Trigger navigation on click
		>
			<div>
				<img
					key={imageUrl[0]?.image}
					src={imageUrl[0]?.image}
					alt={title}
					className="object-fill min-w-[140px] max-w-[140px] aspect-square"
				/>
			</div>
			<div className="flex">
				<div className="text-black p-2 pt-4 space-y-1">
					<h6 className="font-extrabold text-lg">{title}</h6>
					<p>{price}</p>
					<p>{location}</p>
					<p className="font-light text-xs text-gray-400">{date}</p>
				</div>
				<div className="flex pt-3 lg:mr-[200px] md:mr-[140px] mr-[70px]" />
			</div>
		</div>
	);
}
