"use client";

import { Product, Tag } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoFunnel, IoHeartOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        const categoryData = JSON.parse(localStorage.getItem('categoryData'));
        if (categoryData && categoryData.products) {
            setProducts(categoryData.products);
        }
        setLoading(false);
    }, []);

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
                    <p>Loading products...</p>
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
                {/* <div className="flex items-center gap-1">
                    <p className="font-bold">Filter</p>
                    <IoFunnel />
                </div> */}
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
                                    <div className="p-1 bg-main rounded-full absolute right-2 top-2">
                                        <IoHeartOutline size={19} className="stroke-white p-0" />
                                    </div>
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
                                    ₦{product.details.amount}
                                </p>
                                {/* <Image
                                    className="absolute bottom-6 right-6"
                                    src={Tag}
                                    alt="tag"
                                /> */}
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