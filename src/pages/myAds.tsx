import React from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard"; 

export default function MyAds ():JSX.Element {
    return (
        <>
            <Navbar />
            <div className="w-auto mx-4 md:mx-8 lg:mx-20 my-10  gap-6 md:space-x-4">
                <div>
                    <h6 className="text-2xl md:text-3xl text-secondary font-extrabold">
                        آگهی‌های من
                    </h6>
                </div>
                <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0 w-auto mt-8">
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </>
    );
}
