import React from "react";
import ToggleIcon from "./ToggleIcon";


const filledColor = '#A6808C'; 
const outlineColor = '#B4B0BF'; 

export default function ProductCard ():JSX.Element {
    return (
        <>
            <div className="min-w-full bg-white flex w-[320px] border-[1.5px] border-primary gap-4 rounded-[2px]">
                <div className="">
                    <img src="/colorful-wallpaper.png" alt="" className="object-fill min-w-[140px] max-w-[140px] aspect-square"></img>
                </div>
                <div className="flex">
                    <div className="flextext-black p-2 pt-4 space-y-1">
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
                    <div className="flex pt-3 lg:mr-[200px] md:mr-[140px] mr-[70px]">
                        <ToggleIcon iconType="heart" filledColor={filledColor} outlineColor={outlineColor} />
                    </div>
                </div>
            </div>
        </>
    );
}