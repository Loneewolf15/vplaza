"use client";

import { Product, Tag } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoFunnel, IoHeartOutline, IoHeart } from "react-icons/io5";
import { useEffect, useState } from 'react';
import axios from "axios";

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const ratingNumber = parseInt(rating) || 0;
    
    return (
        <div className="flex">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index}>
                    {index < ratingNumber ? (
                        <FaStar size={10} className="fill-[#FFF500]" />
                    ) : (
                        <FaRegStar size={10} className="fill-[#FFF500]" />
                    )}
                </span>
            ))}
        </div>
    );
};

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistAction, setWishlistAction] = useState("");
    const [isInWishlist, setIsInWishlist] = useState(false);
    const requestID = "rid_1983";

    useEffect(() => {
        const categoryData = JSON.parse(localStorage.getItem('categoryData'));
        if (categoryData && categoryData.products) {
            setProducts(categoryData.products);
        }
        
        // Load wishlist from localStorage
      
        setLoading(false);
    }, []);

    
      const toggleWishlist = async () => {
        setLoading(true); // Start loader
        try {
          const token = localStorage.getItem("token");
          const storedProduct = JSON.parse(localStorage.getItem("categoryData"));
          const product = storedProduct.products[0]; // Access the first item in the products array
          
          if (!product || !product.details) {
            throw new Error("Product details not found.");
          }
          
          const inWishlist = product.inWishList === 1;
          setWishlistAction(inWishlist ? "Removing from wishlist..." : "Adding to wishlist...");
          
          // Determine the correct endpoint based on the wishlist status
          const endpoint = inWishlist
            ? "https://api.vplaza.com.ng/products/removeFromWishList"
            : "https://api.vplaza.com.ng/products/addToWishList";
          
          console.log("Sending data to wishlist:", {
            endPoint: endpoint,
            product_id: product.details.product_id,
            requestID,
          });
      
          const response = await axios.post(
            endpoint,
            {
              product_id: product.details.product_id,
              requestID,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          if (response.status === 200) {
            // Toggle wishlist status locally
            const updatedStatus = inWishlist ? 0 : 1;
            const updatedProduct = { 
              ...storedProduct, 
              products: [
                { ...product, inWishList: updatedStatus },
              ],
            };
            localStorage.setItem("categoryData", JSON.stringify(updatedProduct));
      
            alert(response.data.message);
            setIsInWishlist(updatedStatus === 1);
      
            console.log(
              inWishlist ? "Removed from wishlist." : "Added to wishlist."
            );
          } else if (response.data.message === "signature verification failed") {
            await router.push("/signin");
          }
        } catch (error) {
          console.error("Error updating wishlist:", error);
        } finally {
          setLoading(false); // Stop loader
        }
      };
      

    const getRating = (product) => {
        if (product.reviews && product.reviews.length > 0) {
            return product.reviews[0].rating;
        }
        return "0";
    };

   

    if (loading) {
        return (
            <main className="pt-8 px-2">
                <Header title="Loading..." />
                <div className="w-full text-center p-4">
                    <p>{wishlistAction || "Processing..."}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-8 px-2">
            <Header
                title={category[0].toUpperCase() + category.slice(1).toLowerCase()}
            />
            <div className="flex justify-end px-4">
               
            </div>
            <section className="flex mt-2 flex-wrap">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="w-1/2">
                            <div className="p-4 relative">
                                <div className="relative">
                                    <img
                                        src={product.details.product_img1}
                                        className="w-full h-[150px] object-cover rounded-lg"
                                        alt={product.details.product_name}
                                    />
                                    <button 
                                        onClick={() => toggleWishlist(product)}
                                        className="p-1 bg-main rounded-full absolute right-2 top-2 transition-transform hover:scale-110"
                                    >
                                        {isInWishlist ? (
                                            <IoHeart size={19} className="fill-white" />
                                        ) : (
                                            <IoHeartOutline size={19} className="stroke-white" />
                                        )}
                                    </button>
                                </div>

                                <h1 className="font-bold pt-2 text-xs truncate">
                                    {product.details.product_name}
                                </h1>
                                <div className="relative">
                                    <div className="flex items-center text-xs gap-1">
                                        <StarRating rating={getRating(product)} />
                                        <span className="text-xs bg-[#D9D9D9] px-1 rounded-sm py-[0.1rem]">
                                            {product.shopDetails.shop_name}
                                        </span>
                                    </div>
                                </div>
                                <p className="font-semibold font-sans text-xl">
                                    ₦{parseInt(product.details.amount)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center p-4">
                        <p>No products found for this category.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default CategoryPage;