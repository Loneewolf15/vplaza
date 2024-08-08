"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BC } from "@/assets";
import { IoArrowBack } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { Reviews } from "../../../dev/helpers";

const page = () => {
  const router = useRouter();
  const ReviewList = ({ items }) => {
    return (
      <div className=" w-full">
        <div className="w-full flex-1">
          {items.map((item, index) => (
            <div
              onClick={() => {
                router.back();
              }}
              key={index}
              className=""
            >
              <div className="w-full flex px-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={22}
                  height={22}
                  className="object-cover rounded-full"
                />
                <div className="mt-1 text-[12px] ml-3 font-semibold">
                  {item.name}
                </div>
              </div>
              <div className="flex w-full px-3">
                <div className="text-[14px] "> {item.review}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="z-30 justify-between flex relative">
        <IoArrowBack
          onClick={() => {
            router.back();
          }}
          color="white"
          className="mt-4 ml-3"
          size={30}
        />
        <FiHeart color="white" className="mt-4 mr-3" size={30} />
      </div>
      <Image className="w-full -mt-12" src={BC} alt="Product" />
      <div className="w-full h-full mx-3">
        <div className="text-lg mt-2 font-bold">
          Embroidered Polo Shirt Men's High-End
        </div>
        <div className="flex mt-1 text-sm">
          4.3
          <IoStarSharp className="pt-1" color="#004AAD" />
          <div className="pl-[2px]">Seller</div>
        </div>
      </div>
      <div className="w-full font-bold mt-2 text-lg mx-3">Description</div>
      <div className="w-full text-[14px] font-medium px-3">
        Collar shirt available in different color as seen in the picture above.
        Thick material and long lasting.
      </div>
      <div className="w-full flex mx-3 mt-2">
        <div className="text-[12px] font-light">Reviews on seller</div>
        <div className="text-[12px] font-light ml-2">(425)</div>
      </div>
      <div>
        <ReviewList items={Reviews} />
      </div>
      {/* CTA footer */}
      <div className="w-full  h-[100px] sticky bottom-0 bg-white ">
        <div className="bg-white justify-between flex rounded-2xl w-[90%] ml-[5%] h-[70%]">
          <div className=" flex justify-between  mt-5 w-full">
            <div className="text-md text-white bg-[#004AAD] rounded-md h-8 pt-1 text-wrap px-4 pb-[2px]">
              Call Seller
            </div>
            <div className="text-md text-[#004AAD] border-[#004AAD] h-8 pt-1 text-wrap px-4 pb-[2px] border-2 rounded-md">
              Message on Whatsapp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
