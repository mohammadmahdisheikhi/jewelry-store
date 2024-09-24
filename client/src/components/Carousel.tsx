import { useState } from "react";

type CarouselProps = {
	images: Array<{ id: string; image: string }>[];
};

export default function Carousel({ images }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1,
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1,
		);
	};

	return (
		<div className="relative w-full overflow-hidden h-auto lg:h-[78vh]">
			<div
				className="flex transition-transform duration-500"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{images.map((image, index) => (
					<div key={image.image} className="min-w-full">
						<img
							src={`http://localhost:8000${image.image}`}
							alt={`Slide ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
			<button
				onClick={prevSlide}
				className="rotate-180 absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 px-2 py-1 rounded-full focus:outline-none"
			>
				&#10094;
			</button>
			<button
				onClick={nextSlide}
				className="rotate-180 absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 px-2 py-1 rounded-full focus:outline-none"
			>
				&#10095;
			</button>
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between gap-1">
				{images.map((_, index) => (
					<div
						key={index}
						className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-gray-200" : "bg-gray-300"}`}
					/>
				))}
			</div>
		</div>
	);
}
