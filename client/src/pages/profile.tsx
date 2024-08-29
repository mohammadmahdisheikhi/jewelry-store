// pages/profile.tsx
import Navbar from "@/components/Navbar";
import { FiArrowLeft } from 'react-icons/fi';
import UserLoader from "@/components/UserLoader";

interface UserProfile {
  firstname: string;
  lastname: string;
  phonenumber: string;
  IDnumber: string;
  // Add any other fields you expect in the user profile
}

function Profile({ user }: { user: UserProfile | null }): JSX.Element {
  if (!user) {
    return <div>Loading...</div>; // Loading state while the user data is being fetched
  }

  console.log('User Data:', user);

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
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.phonenumber}</p>
          <p>{user.IDnumber}</p>
        </div>
        <div className="md:grid grid-cols-2 md:gap-8 space-y-4 md:space-y-0">
          <a href="/addad" className="flex justify-between align-baseline w-full p-4 text-white text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-secondary">
            انتشار آگهی جدید
            <FiArrowLeft className="w-6 h-6 text-white" />
          </a>
          <a href="/personal" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            اطلاعات شخصی و مالی
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
          <a href="/bookmarks" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            علاقه‌مندی‌ها
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
          <a href="/cart" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            سبد خرید
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
          <a href="/orderTrackingBuy" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            پیگیری سفارش‌های خرید
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
          <a href="/orderTrackingSell" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            پیگری سفارش‌های فروش
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
          <a href="/myAds" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            آگهی‌های من
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
          <a href="/transactions" className="flex justify-between align-baseline w-full p-4 text-secondary text-extrabold border-[1.5px] border border-secondary rounded-[2px] bg-white">
            تراکنش‌ها
            <FiArrowLeft className="w-6 h-6 text-secondary" />
          </a>
        </div>
      </div>
    </>
  );
}

export default function ProfilePage(): JSX.Element {
  return (
    <UserLoader>
      {(user) => <Profile user={user} />}
    </UserLoader>
  );
}
