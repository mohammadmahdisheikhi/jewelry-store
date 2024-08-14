import Navbar from "@/components/Navbar";
import Drawer from "@/components/Drawer";
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
        <div className="md:grid grid-cols-2 md:gap-8 space-y-4 md:space-y-0">
            <a href="/personal" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white"> اطلاعات شخصی و مالی
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
            <a href="/bookmarks" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">علاقه‌مندی‌ها
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
            <a href="/cart" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">سبد خرید
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
            <a href="/orderTracking" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">پیگیری سفارش‌های خرید
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
            <a href="/sells" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">پیگری سفارش‌های فروش
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
            <a href="/myAds" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">آگهی‌های من
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
            <a href="/transcations" className="flex justify-between align-baseline w-full p-4 text-scondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">تراکنش‌ها
                <FiArrowLeft  className="w-6 h-6 text-secondary"/>
            </a>
        </div>
      </div>
    </>
  );
}
