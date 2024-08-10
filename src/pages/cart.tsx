import React from "react";
import Navbar from "@/components/Navbar";

export default function Cart ():JSX.Element {
    return (
        <>
            <Navbar />
            <div className=" mx-4 md:mx-8 lg:mx-20 my-10  gap-6 md:space-x-4">
                <div>
                    <h6 className="text-2xl md:text-3xl text-secondary font-extrabold mb-8">
                        سبد خرید شما
                    </h6>
                </div>
                <div className="md:flex border border-[1.5px] border-secondary rounded-sm gap-6 space-y-4 p-4">
                    <div className="md:max-w-[200px] md:w-1/3 aspect-square">
                        <img src="/image1.png" alt=""></img>
                    </div>
                    <div className="md:w-2/3">
                        <h6>
                            عنوان آگهی
                        </h6>
                        <span className="font-light text-gray-600 my-4">نوع:</span> <br />
                        <span className="font-light text-gray-600 my-4">وزن:</span> <br />
                        <span className="font-light text-gray-600 my-4">مکان:</span> <br />
                        <span className="font-light text-gray-600 my-4">قیمت:</span> <br />
                        <a href="" className="text-sm font-extrabold text-scondary mt-4">مشاهده آگهی</a>
                    </div>
                </div>
                <div className="flex justify-between my-6 py-2  border-t-[1.5px] border-secondary">
                    <p className="font-light text-gray-800">مجموع قابل پرداخت:</p>
                    <p className="font-black text-black">35/000/000 تومان</p>
                </div>
                <div className="flex justify-center mb-6">
                    <a href="" className="bg-button hover:bg-buttonHover text-white px-6 py-2 mt-4">پرداخت و ادامه فرایند خرید</a>
                </div>
            </div>
        </>
    );
}
