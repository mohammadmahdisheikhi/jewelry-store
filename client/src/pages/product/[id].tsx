import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "../product";
import axios from "axios";



interface ProductProps {
  title: string;
  type: string;
  weight: string;
  carat: string;
  location: string;
  price: string;
  description: string;
  images: string[]; // Array of image URLs
  sellerName: string;
  sellerContact: string;
}

export default function ProductDetail(): JSX.Element {
    const router = useRouter();
    const { id } = router.query;  // Get the product ID from the URL
    const [productData, setProductData] = useState<ProductProps | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch the product data from your API
            axios.get(`http://localhost:8000/ad/ad/${id}/`)
                .then(response => setProductData(response.data))
                .catch(error => console.error('Failed to fetch product:', error));
        }
    }, [id]);

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Product {...productData} />
        </>
    );
}
