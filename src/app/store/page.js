"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaEdit,
  FaUtensils,
  FaConciergeBell,
  FaPlus,
} from "react-icons/fa";
import { MdStore, MdHomeFilled } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { items } from "../../../dev/helpers";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const tken = localStorage.getItem("token");
    setToken(tken);
  });

  const handleSave = () => {
    console.log("Button clicked");
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-card p-4 md:p-8">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaArrowLeft
              className="cursor-pointer mr-4"
              size={24}
              onClick={handleBack}
            />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              Your Store
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <img
            src="https://placehold.co/100x100"
            alt="Profile Picture"
            className="rounded-full border-2 border-primary w-24 h-24 md:w-32 md:h-32"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-semibold text-foreground">
              Steralizer
            </h3>
            <p className="text-muted-foreground">
              Bursting your head with delicious meal
            </p>
            <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <button
                className="bg-[#004AAD] flex items-center justify-center text-center font-bold text-lg rounded-lg text-white py-2 px-4 cursor-pointer"
                onClick={handleSave}
              >
                <FaEdit className="mr-2" size={20} />
                Edit
              </button>
              <button
                className="bg-[#004AAD] flex items-center justify-center text-center font-bold text-lg rounded-lg text-white py-2 px-4 cursor-pointer"
                onClick={handleSave}
              >
                <FaUtensils className="mr-2" size={20} />
                Switch to food
              </button>
            </div>
            <div className="mt-2 flex justify-center md:justify-start">
              <button
                className="bg-[#004AAD] flex items-center justify-center text-center font-bold text-lg rounded-lg text-white py-2 px-4 cursor-pointer"
                onClick={handleSave}
              >
                <FaConciergeBell className="mr-2" size={20} />
                Offer a service
              </button>
            </div>
          </div>
        </div>

        <h4 className="mt-8 text-xl md:text-2xl font-bold text-foreground">
          Products
        </h4>
        <button
          className="bg-[#004AAD] flex items-center justify-center text-center font-bold text-lg rounded-lg text-white py-2 px-4 mt-2 cursor-pointer"
          onClick={handleSave}
        >
          <FaPlus className="mr-2" size={20} />
          Add New Product
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-full h-40 object-cover rounded-md"
              />
              <h5 className="mt-4 font-semibold text-foreground">
                {item.name}
              </h5>
              <p className="text-muted-foreground">{item.price}</p>
              <div className="text-yellow-500">
                ★★★★☆
                <span className="text-accent-foreground ml-1">New!</span>
              </div>
              <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                New
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full h-[100px] sticky bottom-0 bg-white">
        <div className="bg-[#004AAD] flex justify-between rounded-2xl w-[90%] mx-auto h-[70%] items-center">
          <MdStore
            onClick={() => router.push("/market")}
            color="#686868"
            size={40}
          />
          <div className="h-[50px] w-[50px] rounded-full bg-white flex items-center justify-center">
            <MdHomeFilled color="#004AAD" size={40} />
          </div>
          {token ? (
            <IoPersonCircleSharp
              onClick={() => router.push("/profile")}
              color="#686868"
              size={40}
            />
          ) : (
            <IoPersonCircleSharp
              onClick={() => router.push("/signin")}
              color="#686868"
              size={40}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
