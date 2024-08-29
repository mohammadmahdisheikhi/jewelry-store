import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import UserLoader from "@/components/UserLoader";

interface UserProfile {
    firstname: string;
    lastname: string;
    phonenumber: string;
    IDnumber: string;
    // Add any other fields you expect in the user profile
}

interface Ad {
    id: number;
    title: string;
    price: string;
    location: string;
    createdAt: string;
    imageUrl: string; // URL of the image
}

function Profile({ user }: { user: UserProfile | null }): JSX.Element {
    if (!user) {
        return <div>Loading...</div>; // Loading state while the user data is being fetched
    }

    const [ads, setAds] = useState<Ad[]>([]); // State to store ads

    useEffect(() => {
        // Fetch ads from the backend API
        const fetchAds = async () => {
            try {
                const response = await axios.get("http://localhost:8000/ad/ads"); // Replace with your actual API endpoint
                setAds(response.data);
            } catch (error) {
                console.error("Failed to fetch ads:", error);
            }
        };

        fetchAds();
    }, []);

    console.log('User Data:', user);

    return (
        <>
            <Navbar />
            <div className="w-auto mx-4 md:mx-8 lg:mx-20 my-10 gap-6 md:space-x-4">
                <div>
                    <h6 className="text-2xl md:text-3xl text-secondary font-extrabold">
                        آگهی‌ها
                    </h6>
                </div>
                <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0 w-auto mt-8">
                    {ads.map((ad) => (
                        <ProductCard
                            key={ad.id}  // Add key for each list item
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

export default function AdsPage(): JSX.Element {
    return (
        <UserLoader>
            {(user) => <Profile user={user} />}
        </UserLoader>
    );
}
