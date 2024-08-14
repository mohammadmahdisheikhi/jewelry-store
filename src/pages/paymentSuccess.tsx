import React from "react";
import Navbar from "@/components/Navbar";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess(): JSX.Element {
    return (
        <>
            <Navbar />
            <div className="bg-white text-center my-8 border border-secondary border-[1.5px] mx-4 md:mx-8 lg:mx-[180px] p-4">
                {/* Tick Icon */}
                <FaCheckCircle 
                    className="text-green-600 mx-auto mb-4" 
                    size={100} 
                />
                <h6 className="text-green-600 font-extrabold text-3xl mb-4">پرداخت موفق!</h6>
                <p className="mb-8">برای پیگیری سفارش می‌توانید به پروفایل خود، صفحه پیگیری سفارش مراجعه کنید.</p>
                <span className="text-gray-600">شماره سفارش:<p></p></span>
                <div className="flex justify-center gap-4 mt-8">
                    <a href="" className="bg-button hover:bg-buttonHover text-white px-6 py-2">پیگیری سفارش</a>
                    <a href="" className="bg-[#fefefe] border-[1.5px] border-button hover:bg-secondary hover:text-white text-secondary px-6 py-2">پروفایل من</a>
                </div>
            </div>
        </>
    );
}
