"use client";
import { Product, Tag } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation"; // Import useSearchParams for query params
import { FaStar } from "react-icons/fa";
import {
    IoFunnel,
    IoHeartOutline,
} from "react-icons/io5";

const page = () => {
    const { category } = useParams(); // Get the category from the URL
    const searchParams = useSearchParams(); // Get the search params
    const products = JSON.parse(searchParams.get("products") || "[]"); // Parse products from query params

    return (
        <main className="pt-8 px-2">
            <Header
                title={category[0].toUpperCase() + category.slice(1).toLowerCase()}
            />
            <div className="flex justify-end px-4">
                <div className="flex items-center gap-1">
                    <p className="font-bold">Filter</p>
                    <IoFunnel />
                </div>
            </div>
            <section className="flex mt-2 flex-wrap">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="w-1/2">
                            <div className="p-4 relative">
                                <div className="relative">
                                    <Image
                                        src={Product} // Replace with product.image if available
                                        className="w-full rounded-lg"
                                        alt={product.name || "Product image"} // Use actual product name if available
                                    />
                                    <div className="p-1 bg-main rounded-full absolute right-2 top-2">
                                        <IoHeartOutline size={19} className="stroke-white p-0" />
                                    </div>
                                </div>

                                <h1 className="font-bold pt-2 text-xs truncate">
                                    {product.name || "Product Name"} {/* Use actual product name */}
                                </h1>
                                <div className="relative">
                                    <p className="flex items-center text-xs gap-1">
                                        {product.rating || "N/A"} {/* Use actual product rating */}
                                        <span className="inline-block">
                                            <FaStar size={10} className="fill-[#FFF500]" />
                                        </span>
                                        <span className="text-xs bg-[#D9D9D9] px-1 rounded-sm py-[0.1rem]">
                                            Seller
                                        </span>
                                    </p>
                                </div>
                                <p className="font-semibold font-sans text-xl">
                                    ₦{product.price || "0.00"} {/* Use actual product price */}
                                </p>
                                <Image
                                    className="absolute bottom-6 right-6"
                                    src={Tag}
                                    alt="tag"
                                />
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

export default page;
