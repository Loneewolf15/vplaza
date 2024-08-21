"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AD } from "@/assets";
import Button from "@/components/button";
import Accordion from "@/components/accordion";
import {
  IoArrowBack,
  IoArrowDown,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { FiArrowDownRight, FiHeart } from "react-icons/fi";
import { Reviews as reviews } from "../../../dev/helpers";
import {
  FaArrowRight,
  FaLongArrowAltRight,
  FaPencilAlt,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdArrowLeft } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

const page = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-screen grid-cols-12 items-start lg:pt-8">
      <section className="col-span-12 lg:col-start-1 lg:col-end-8 lg:p-4 flex flex-col lg:flex-row gap-2">
        <div className="px-4 flex items-center justify-between  order-2 lg:order-1">
          <div className="flex lg:flex-col overflow-x-scroll lg:overflow-hidden gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square shrink-0 w-12 h-12 lg:w-16 lg:h-16 relative rounded-xl overflow-hidden"
              >
                <Image
                  className="object-cover w-full h-full"
                  alt="Food Image"
                  fill
                  src={AD}
                />
              </div>
            ))}
          </div>
          <FaTrash size={24} className="fill-main" />
        </div>
        <div className="order-1 lg:order-2 lg:max-w-[90%] lg:w-full px-4 lg:pr-8 relative lg:rounded-md aspect-square lg:aspect-square overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            alt="Food Image"
            fill
            src={AD}
          />
          <div className="absolute top-0 p-2 left-0 z-20 flex w-full lg:justify-end justify-between">
            <div className="p-2 cursor-pointer flex items-center justify-center rounded-full lg:hidden">
              <IoArrowBack size={18} className="stroke-white bg-main" />
            </div>
            <Button className="flex gap-1 px-2 py-1 text-sm items-center">
              <FaPencilAlt size={12} /> Edit
            </Button>
          </div>
        </div>
      </section>
      <section className="col-span-12 lg:sticky lg:top-0 lg:overflow-y-scroll max-h-screen lg:col-start-8 px-2 pt-3 lg:p-6 lg:pt-8 lg:col-end-12">
        <h1 className="font-bold mb-2 md:text-3xl">
          Bolonese SPag and Meat Balls
        </h1>
        <div className="relative">
          <p className="flex items-center text-xs gap-1">
            4.3
            <span className="inline-block">
              <FaStar size={10} className="fill-[#FFF500]" />
            </span>
            <span className="text-xs bg-[#D9D9D9] px-1 rounded-sm py-[0.1rem]">
              Seller
            </span>
          </p>
          <p className="absolute font-sans right-0 text-main font-semibold text-3xl top-0">
            ₦8,500
          </p>
        </div>

        <div className="mt-3">
          <h2 className="font-bold text-sm">Description</h2>
          <p className="text-sm">
            spicy spag with garnished meat balls flavoured nicely.
          </p>
        </div>
        <div className="mt-3 py-4">
          <h2 className="font-bold text-sm mb-3">
            Reviews on seller <span className="opacity-60">(422)</span>
          </h2>
          {reviews.slice(0, 3).map(({ name, review, image }, index) => (
            <div
              key={index}
              className="my-4 border-b border-black py-2 border-opacity-10 flex gap-2"
            >
              <div className="w-8 h-8 shrink-0 relative">
                <Image
                  className="rounded-full"
                  fill
                  src={image}
                  alt="fan image"
                />
              </div>
              <div>
                <p className="font-bold text-sm">{name}</p>
                <p className="text-xs">{review}</p>
              </div>
            </div>
          ))}
          <p className="font-bold text-end">View More</p>
        </div>
      </section>
    </main>
  );
};

export default page;
