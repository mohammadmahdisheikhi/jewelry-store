import React from "react";

export default function ProductCard ():JSX.Element {
    return (
        <>
            <div className="w-auto w-[180px] border-[1.25px] border-primary rounded-[2px]">
                <div className="">
                    <img src="/colorful-wallpaper.png" alt="" className="object-fill min-w-[180px] min-h-[120px] max-w-[180px] max-h-[120px] "></img>
                </div>
                <div className="flextext-black p-2 space-y-1">
                    <h6 className="font-extrabold text-lg">
                        نام محصول
                    </h6>
                    <p className="">
                        قیمت محصول
                    </p>
                    <p className="">
                        مکان محصول
                    </p>
                    <p className="font-light text-xs text-gray-400">
                        ساعت آگهی
                    </p>
                </div>
            </div>
        </>
    );
}