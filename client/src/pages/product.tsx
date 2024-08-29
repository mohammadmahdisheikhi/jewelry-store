import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ToggleIcon from "@/components/ToggleIcon";
import Carousel from "@/components/Carousel";
import UserLoader from "@/components/UserLoader";
import { useGlobalState } from "@/components/GlobalStateContext";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from 'react-hot-toast';


export interface ProductProps {
  id: number;
  imageUrl: string;
  createdAt: string;
  title: string;
  type: string;
  weight: string;
  carat: string;
  location: string;
  price: string;
  description: string;
  images: string[];
  sellerName: string;
  sellerContact: string;
  sellerId: number;
}

export default function Product({
  id,
  title,
  type,
  weight,
  carat,
  location,
  price,
  description,
  images,
  sellerName,
  sellerContact,
  sellerId
}: ProductProps): JSX.Element {

  const { addToBookmarks, addToCart } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAd = () => {
    // Open the confirmation modal
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/ad/delete/${id}/`, {
        method: 'DELETE',
        credentials: 'include', // Ensures the request is authenticated
      });

      if (response.ok) {
        toast.success("Ad deleted successfully!");
        // Redirect or update UI after deletion
        window.location.href = '/ads';
      } else {
        toast.error("Failed to delete the ad.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the ad.");
      console.error("Error deleting ad:", error);
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <UserLoader>
      {(user) => {
        const isOwner = user?.id === sellerId;

        const handleAddToBookmarks = () => {
          addToBookmarks({
            id,
            title,
            type,
            weight,
            carat,
            location,
            price,
            description,
            images,
            sellerName,
            sellerContact
          });
        };

        const handleAddToCart = () => {
          addToCart({
            id,
            title,
            type,
            weight,
            carat,
            location,
            price,
            description,
            images,
            sellerName,
            sellerContact
          });
        };

        return (
          <>
            <Navbar />
            <div className="md:flex mx-4 md:mx-8 lg:mx-20 my-10 md:space-x-4 gap-12">
              <div className="md:w-1/2 space-y-8">
                <Carousel images={images} />
              </div>
              <div className="md:w-1/2">
                <h6 className="font-extrabold text-lg text-secondary my-4">{title}</h6>
                <span className="flex gap-2 font-light text-gray-600 my-4">نوع: <p className='font-medium text-black'>{type}</p></span>
                <span className="flex gap-2 font-light text-gray-600 my-4">وزن: <p className='font-medium text-black'>{weight}</p>گرم</span>
                <span className="flex gap-2 font-light text-gray-600 my-4">عیار: <p className='font-medium text-black'>{carat}</p>عیار</span>
                <span className="flex gap-2 font-light text-gray-600 my-4">مکان: <p className='font-medium text-black'>{location}</p></span>
                <span className="flex gap-2 font-light text-gray-600 my-4">قیمت: <p className='font-medium text-black'>{price}</p>تومان</span>
                <span className="flex gap-2 font-light text-gray-600 my-4">توضیحات: <p className='font-medium text-black'>{description}</p></span>

                <div className="mt-8">
                  <div className="flex  align-baseline">
                    <ToggleIcon 
                      iconType="heart" 
                      filledColor="#5D4A46" 
                      outlineColor="#000000" 
                      onClick={handleAddToBookmarks} 
                    />
                    <ToggleIcon 
                      iconType="cart" 
                      filledColor="#5D4A46" 
                      outlineColor="#000000" 
                      onClick={handleAddToCart} 
                    />
                    {isOwner && (
                      <ToggleIcon
                        iconType="delete"
                        filledColor="#D9534F"
                        outlineColor="#000000"
                        onClick={handleDeleteAd}
                      />
                    )}
                    <a href="/ads" className="font-extrabold text-sm text-secondary hover:text-gray-800 translate-y-[10px] mx-2">
                      بازگشت به آگهی‌ها
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex mx-4 md:mx-8 lg:mx-20 my-10 md:space-x-4 gap-12 justify-end">
              <div className="w-1/2"></div>
              <div className="p-4 md:w-1/2 space-y-4 border border-[1.5px] border-secondary rounded-sm">
                <p className="flex">آگهی‌دهنده:<h6 className="font-bold mr-2">{user?.firstname} {user?.lastname}</h6></p>
                <p className="flex">شماره تماس:<p className="font-bold mr-2">{sellerContact}</p></p>
              </div>
            </div>

            {isModalOpen && (
              <ConfirmationModal
                message="آیا از حذف این آگهی مطمئن هستید؟"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsModalOpen(false)}
              />
            )}
          </>
        );
      }}
    </UserLoader>
  );
}
