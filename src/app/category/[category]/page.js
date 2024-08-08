"use client";

import React from "react";
import { items } from "../../../../dev/helpers";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();
  const ProductList = ({ items }) => {
    return (
      <div className=" w-full">
        <div className="grid grid-cols-2 w-full gap-4">
          {items.map((item, index) => (
            <div
              onClick={() => {
                router.push("/product");
              }}
              key={index}
              className="flex flex-col items-center p-4 border border-gray-300 rounded"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="object-cover"
              />
              <div className="w-full">
                <div className="mt-2 text-[10px] font-semibold">
                  {item.name}
                </div>
              </div>
              <div className="flex text-sm w-full">
                <div className="flex">
                  {item.rating}
                  <IoStarSharp color="#FFF500" className="mt-[2px] pl-[2px]" />
                </div>
                <div className="pl-2">{item.seller}</div>
              </div>
              <div className="font-semibold flex w-full text-lg">
                <div className="text-xl "> {item.price}</div>
                <div className="text-sm mt-[3px] ml-3 text-[#004AAD] font-medium">
                  {" "}
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="w-full flex">
        <div className="z-30 justify-between flex relative">
          <IoArrowBack
            onClick={() => {
              router.back();
            }}
            color="black"
            className="mb-1 ml-3"
            size={30}
          />
          <div className="flex pt-1 font-semibold text-lg w-full pl-3">
            Phone
          </div>
        </div>
      </div>
      <ProductList items={items} />
    </div>
  );
};

export default page;
