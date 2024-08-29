// pages/MyAds.tsx
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import UserLoader from "@/components/UserLoader";
import axios from "axios";

interface UserProfile {
  firstname: string;
  lastname: string;
  phonenumber: string;
  IDnumber: string;
  // Add any other fields you expect in the user profile
}

interface MyAds {
  id: number;
  title: string;
  price: string;
  location: string;
  createdAt: string;
  imageUrl: string;
}

function MyAds({ user }: { user: UserProfile | null }): JSX.Element {
  const [ads, setAds] = useState<MyAds[]>([]);

  console.log('User Data:', user);

  useEffect(() => {
    if (user) {
      // Fetch ads only if the user is available
      const fetchAds = async () => {
        try {
          const token = localStorage.getItem('token');  // Assuming you store the token in localStorage
  
          const response = await axios.get("http://localhost:8000/ad/myads", {
            headers: {
              Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
            withCredentials: true,  // If you're using cookies for session-based authentication
          });
  
          setAds(response.data);
        } catch (error) {
          console.error("Error fetching ads:", error);
        }
      };
  
      fetchAds();
    }
  }, [user]);
  
  
  if (!user) {
    return <div>Loading...</div>; // Loading state while the user data is being fetched
  }

  return (
    <>
      <Navbar />
      <div className="w-auto mx-4 md:mx-8 lg:mx-20 my-10 gap-6 md:space-x-4">
        <div>
          <h6 className="text-2xl md:text-3xl text-secondary font-extrabold">
            آگهی‌های من
          </h6>
        </div>
        <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0 w-auto mt-8">
          {ads.map((ad) => (
            <ProductCard 
              key={ad.id}
              id={ad.id}
              title={ad.title}
              price={ad.price}
              location={ad.location}
              createdAt={ad.createdAt}
              imageUrl={ad.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function MyAdsPage(): JSX.Element {
  return (
    <UserLoader>
      {(user) => <MyAds user={user} />}
    </UserLoader>
  );
}
