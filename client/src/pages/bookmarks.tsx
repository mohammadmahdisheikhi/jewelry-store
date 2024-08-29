// pages/Bookmarks.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useGlobalState } from "@/components/GlobalStateContext";
import UserLoader from "@/components/UserLoader";

interface UserProfile {
  firstname: string;
  lastname: string;
  phonenumber: string;
  IDnumber: string;
  createdAt: string;
  imageUrl: string;
  // Add any other fields you expect in the user profile
}

function Bookmarks({ user }: { user: UserProfile | null }): JSX.Element {
  const { bookmarks } = useGlobalState();

  if (!user) {
    return <div>Loading...</div>; // Loading state while the user data is being fetched
  }

  console.log("User Data:", user);

  return (
    <>
      <Navbar />
      <div className="w-auto mx-4 md:mx-8 lg:mx-20 my-10 gap-6 md:space-x-4">
        <div>
          <h6 className="text-2xl md:text-3xl text-secondary font-extrabold">
            آگهی‌های نشان شده
          </h6>
        </div>
        <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0 w-auto mt-8">
          {bookmarks.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              title={product.title}
              price={product.price}
              location={product.location}
              createdAt={product.createdAt}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function BookmarksPage(): JSX.Element {
  return (
    <UserLoader>
      {(user) => <Bookmarks user={user} />}
    </UserLoader>
  );
}
