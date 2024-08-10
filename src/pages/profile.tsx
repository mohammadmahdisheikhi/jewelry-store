import Navbar from "@/components/Navbar";
import Drawer from "@/components/Drawer";
import { Button } from "flowbite-react";
import { FiArrowRight, FiArrowLeft,  } from 'react-icons/fi';


export default function Profile(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="mx-4 md:mx-8 lg:mx-20 my-10">
        <div className="mb-8">
            <h3 className="text-2xl md:text-3xl text-secondary font-extrabold mb-2">
                پروفایل من
            </h3>
            <p className="text-gray-800">
                در این قسمت به امکانات مختلف خود دسترسی دارید.
            </p>
        </div>
        <div className="md:flex gap-8">
            <button className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary my-4 rounded-[2px]">علاقه‌مندی‌ها
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </button>
            <button className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary my-4 rounded-[2px]">سبد خرید
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </button>
        </div>
        <div className="md:flex gap-8">
            <button className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary my-4 rounded-[2px]">آگهی‌های من
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </button>
            <button className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary my-4 rounded-[2px]">تراکنش‌ها
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </button>
        </div>
      </div>
    </>
  );
}
