import React from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard"; 

export default function Ads ():JSX.Element {
    return (
        <>
            <Navbar />
            <div className="w-auto mx-4 md:mx-8 lg:mx-20 my-10  gap-6 md:space-x-4">
                <div>
                    <h6 className="text-2xl md:text-3xl text-secondary font-extrabold mb-8">
                        آگهی‌ها
                    </h6>
                </div>
                <div className="justify-start gap-8">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </>
    );
}
