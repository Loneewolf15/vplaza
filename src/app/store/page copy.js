"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import "../../../dev/styles.css";

const StorePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex flex-col items-center p-6 bg-[#D9D9D9] rounded-lg shadow-lg w-full min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="loader">Loading...</div>
        </div>
      )}

      <div className="max-w-4xl mr-auto  shadow-lg">
        <div className="flex items-center w-full mb-6">
          <IoArrowBack
            onClick={() => router.back()}
            color="black"
            className="mr-4"
            size={30}
          />
          <h1 className="text-3xl font-extrabold">Your Store</h1>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-6 border-primary dark:border-primary-foreground">
              <img
                src="https://placehold.co/200?text=Profile+Picture"
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-8">
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded transition">
                <img
                  src="https://placehold.co/40?text=✏️"
                  alt="Edit Icon"
                  className="w-7 h-7 inline-block mr-3"
                />
                Edit
              </button>
              <button className="bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-3 rounded transition mt-4">
                <img
                  src="https://placehold.co/40?text=🍔"
                  alt="Food Icon"
                  className="w-7 h-7 inline-block mr-3"
                />
                Switch to food
              </button>
              <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded transition mt-4">
                <img
                  src="https://placehold.co/40?text=💼"
                  alt="Service Icon"
                  className="w-7 h-7 inline-block mr-3"
                />
                Offer a service
              </button>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground dark:text-muted-foreground text-center mt-8">
          Bursting your head with delicious meal
        </p>
        <h2 className="text-xl font-semibold mt-10 text-primary dark:text-primary-foreground">
          Products
        </h2>
        <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded transition">
          <img
            src="https://placehold.co/40?text=➕"
            alt="Add Icon"
            className="w-7 h-7 inline-block mr-3"
          />
          Add New Product
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-card dark:bg-card-foreground rounded-lg shadow-md p-6">
            <img
              src="https://placehold.co/400?text=Product+1"
              alt="Product 1"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
              Product 1
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground mt-2">
              Description of Product 1
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <img
                  src="https://placehold.co/30?text=⭐"
                  alt="Rating"
                  className="w-6 h-6 mr-2"
                />
                <span className="text-muted-foreground dark:text-muted-foreground">
                  4.5
                </span>
              </div>
              <span className="text-primary dark:text-primary-foreground">
                $19.99
              </span>
            </div>
            <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded transition">
              View Details
            </button>
          </div>
          <div className="bg-card dark:bg-card-foreground rounded-lg shadow-md p-6">
            <img
              src="https://placehold.co/400?text=Product+2"
              alt="Product 2"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">
              Product 2
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground mt-2">
              Description of Product 2
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <img
                  src="https://placehold.co/30?text=⭐⭐⭐⭐"
                  alt="Rating"
                  className="w-12 h-6 mr-2"
                />
                <span className="text-muted-foreground dark:text-muted-foreground">
                  4.0
                </span>
              </div>
              <span className="text-primary dark:text-primary-foreground">
                $24.99
              </span>
            </div>
            <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
