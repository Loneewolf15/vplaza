"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/assets";
import Button from "@/components/button";
import axios from "axios";
import Accordion from "@/components/accordion";
import { IoArrowBack, IoArrowDown } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { FiArrowDownRight, FiHeart } from "react-icons/fi";
import { FaArrowRight, FaLongArrowAltRight, FaStar } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdArrowLeft } from "react-icons/md";

import { IoLogoWhatsapp } from "react-icons/io";

const ProductDetailsPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState(false);
  const requestID = "rid_1983";
  useEffect(() => {
    // Get the product data passed from the previous page
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (productData) {
      setProduct(productData);
      setIsInWishlist(productData.inWishList === 1);
    }
    if (userData) {
      setUname(userData.username);
      
    }
  }, []);

  const toggleWishlist = async () => {
  setLoading(true); // Start loader
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://vplaza.com.ng/products/addToWishList",
      {
        product_id: product.details.product_id,
        r_id: "rid_1983"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // Toggle wishlist status locally
      setIsInWishlist(!isInWishlist);

      // Update the product data in localStorage
      const updatedProduct = { ...product, inWishList: isInWishlist ? 0 : 1 };
      localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));

      console.log("Wishlist updated successfully.");
    } else if (response.data.message === "signature verification failed") {
      await router.push("/signin");
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
  } finally {
    setLoading(false); // Stop loader
  }
};


  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitReview = async () => {
    setLoading(true); 
    try {
      const token = localStorage.getItem("token");
      console.log("Sending data to review:", {
        productId: product.details.product_id,
        rating: selectedRating,
        review: reviewText,
        requestID,
      });

      const response = await axios.post(
        "https://api.vplaza.com.ng/products/postReview",
        {
          product_id: product.details.product_id,
          rating: selectedRating,
          review: reviewText,
          requestID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        console.log(response.data.messag);
        alert("Revieww posted..");
        //await router.push("/");
      } else if (response.data.message === "signature verification failed") {
        await router.push("/signin");
      }

      // Update the product data in localStorage
      const updatedProduct = { 
        ...product, 
        reviews: [
          ...product.reviews, 
          {
            id: product.reviews.length + 1,
            product_id: product.details.product_id,
            desc: reviewText,
            rating: selectedRating.toString(),
            user_id: 'user829e662ff4b223aa4bb382bb8d0e9bd8',
            username: uname,
            img: 'https://images.squarespace-cdn.com/content/v1/50eca855e4b0939ae8bb12d9/1414865529007-1CEXSGLSU78MIYH77PUX/image-asset.png',
          }
        ]
      };
      
      localStorage.setItem('selectedProduct', JSON.stringify(updatedProduct));
      setReviewText('');
      setSelectedRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false); // Stop the loader
    }
};


  if (!product) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex justify-center items-center h-[60vh]">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="grid min-h-screen grid-cols-12 items-start lg:pt-8">
       {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="loader">Posting Review...</div>
        </div>
      )}
      <section className="col-span-12 lg:col-start-1 lg:col-end-8 lg:p-4 flex flex-col lg:flex-row gap-2">
        <div className="px-2 order-2 lg:order-1">
          <div className="flex lg:flex-col overflow-x-scroll lg:overflow-hidden gap-2">
            {product.details.product_img2 !== '0' && (
              <div
                className="aspect-square shrink-0 w-12 h-12 lg:w-16 lg:h-16 relative rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  className="object-cover w-full h-full"
                  alt="Product Image"
                  fill
                  src={product.details.product_img2}
                />
              </div>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:max-w-[90%] lg:w-full px-4 lg:pr-8 relative lg:rounded-md aspect-square lg:aspect-square overflow-hidden">
          <img
            className="object-cover w-full h-full"
            alt="Product Image"
            fill
            src={product.details.product_img1}
          />
          <div className="absolute top-0 p-2 left-0 z-20 flex w-full lg:justify-end justify-between">
            <div className="p-2 cursor-pointer flex items-center justify-center rounded-full lg:hidden">
              <IoArrowBack
                onClick={() => {
                  router.back();
                }}
                color="white"
                size={24}
              />
            </div>
            <div
              onClick={toggleWishlist}
              className="p-2 cursor-pointer justify-center items-center rounded-full"
            >
              {isInWishlist ? (
                <FiHeart size={18} className="fill-red-500" />
              ) : (
                <FiHeart size={18} className="stroke-white" />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="col-span-12 lg:sticky lg:top-0 lg:overflow-y-scroll max-h-screen lg:col-start-8 px-2 pt-3 lg:p-6 lg:pt-8 lg:col-end-12">
        <h1 className="font-bold mb-2 md:text-3xl">{product.details.product_name}</h1>
        <div className="relative">
          <p className="flex items-center text-xs gap-1">
            {product.average_r.average}
            <span className="inline-block">
              <FaStar size={10} className="fill-[#FFF500]" />
            </span>
            <span className="text-xs bg-[#D9D9D9] px-1 rounded-sm py-[0.1rem]">
              {product.shopDetails.shop_name}
            </span>
          </p>
          <p className="absolute font-sans right-0 text-main font-semibold text-3xl top-0">
            ₦{product.details.amount}
          </p>
        </div>

        <div className="mt-3">
          <h2 className="font-bold text-sm">Description</h2>
          <p className="text-sm">{product.details.product_desc}</p>
        </div>
        <div className="mt-3">
        <h2 className="font-bold text-sm mb-3">
  Reviews on seller <span className="opacity-60">({(product.reviews || []).length})</span>
</h2>

{product.reviews && product.reviews.length > 0 ? (
  product.reviews.map(({ username, desc, rating, img }, index) => (
    <div
      key={index}
      className="my-4 border-b border-black py-2 border-opacity-10 flex gap-2"
    >
      <div className="w-8 h-8 shrink-0 relative">
        <img
          className="rounded-full"
          fill
          src={img}
          alt="fan image"
        />
      </div>
      <div>
        <p className="font-bold text-sm">{username}</p>
        <p className="text-xs">{desc}</p>
        <div className="flex gap-1 mt-1">
          {Array.from({ length: parseInt(rating) }).map((_, i) => (
            <FaStar key={i} size={10} className="fill-[#FFF500]" />
          ))}
        </div>
      </div>
    </div>
  ))
) : (
  <p>No reviews available</p>
)}

        </div>
        <div className="flex flex-col">
          <p className="font-bold text-lg">Rate Product</p>
          <div className="flex gap-1 my-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                size={20}
                className={`${selectedRating > index ? 'fill-[#FFF500]' : 'fill-[#D9D9D9]'}`}
                onClick={() => handleRatingSelect(index + 1)}
              />
            ))}
          </div>
          <textarea
            className="border-black resize-none h-[97px] w-full border-opacity-60 border-[0.5px] rounded-xl"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <Button
            className="font-black text-main flex self-end items-center gap-2"
            variant="plain"
            onClick={handleSubmitReview}
          >
            Submit
            <svg
              width="31"
              height="15"
              viewBox="0 0 31 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.7071 8.20711C31.0976 7.81658 31.0976 7.18342 30.7071 6.79289L24.3431 0.428932C23.9526 0.0384078 23.3195 0.0384078 22.9289 0.428932C22.5384 0.819457 22.5384 1.45262 22.9289 1.84315L28.5858 7.5L22.9289 13.1569C22.5384 13.5474 22.5384 14.1805 22.9289 14.5711C23.3195 14.9616 23.9526 14.9616 24.3431 14.5711L30.7071 8.20711ZM0 8.5H30V6.5H0V8.5Z"
                fill="#004AAD"
              />
            </svg>
          </Button>
        </div>
        <div className="w-full font-bold flex gap-1 mt-8 py-2">
          <Button
            className="px-4 shrink-0 text-xs"
            onClick={() => {
              window.location.href = `tel:${product.shopDetails.shop_whatsapp_link}`;
            }}
          >
            Call Seller
          </Button>
          <Button
            variant="outline"
            className="border-main px-4 py-2 flex items-center text-main text-xs shrink-0"
            onClick={() => {
              window.location.href = `https://wa.me/${product.shopDetails.shop_whatsapp_link}`;
            }}
          >
            <IoLogoWhatsapp
              size={22}
              className="fill-main mr-[0.1rem] inline-block align-middle"
            />
            Message on Whatsapp
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;