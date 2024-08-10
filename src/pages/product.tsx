import React from "react";
import Navbar from "@/components/Navbar";
import ToggleIcon from "@/components/ToggleIcon";

export default function Product(): JSX.Element {
  const filledColor = '#FF0000'; // Example custom filled color
  const outlineColor = '#000000'; // Example custom outline color

  return (
    <>
      <Navbar />
      <div className="md:flex mx-4 md:mx-8 lg:mx-20 my-10 md:space-x-4 gap-12">
        <div className="md:w-1/2 space-y-8">
          <div>
            <img src="image1.png" alt='' className="aspect-square"></img>
          </div>
          <div>
            <img src="image1.png" alt='' className="aspect-square"></img>
          </div>
        </div>
        <div className="md:w-1/2">
          <h6 className="font-extrabold text-lg text-secondary my-4">
            عنوان محصول
          </h6>
          <span className="font-light text-gray-600 my-4">نوع:</span> <br />
          <span className="font-light text-gray-600 my-4">وزن:</span> <br />
          <span className="font-light text-gray-600 my-4">مکان:</span> <br />
          <span className="font-light text-gray-600 my-4">قیمت:</span> <br />
          <span className="font-light text-gray-600 my-4">توضیحات:</span> <br />

          <div className="mt-8">
            <div className="flex space-x-4 align-baseline">
              <ToggleIcon iconType="heart" filledColor={filledColor} outlineColor={outlineColor} />
              <ToggleIcon iconType="cart" filledColor={filledColor} outlineColor={outlineColor} />
              <a href="" className="font-extrabold text-sm text-secondary hover:text-gray-800 translate-y-[10px]">بازگشت به آگهی‌ها</a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex mx-4 md:mx-8 lg:mx-20 my-10 md:space-x-4 gap-12 justify-end">
        <div className="w-1/2">
        </div>
        <div className="p-4 md:w-1/2 space-y-4 border border-[1.5px] border-secondary rounded-sm">
          <span className="flex">آگهی‌دهنده:<h6 className="font-bold mr-2">محمدمهدی شیخی</h6></span>
          <span className="flex">شماره تماس:<p className="font-bold mr-2">09121234567</p></span>
        </div>
      </div>
    </>
  );
}
