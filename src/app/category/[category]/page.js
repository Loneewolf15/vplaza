"use client";
import { Product, Tag } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import {
  IoFilter,
  IoFunnel,
  IoHeart,
  IoHeartCircle,
  IoHeartOutline,
} from "react-icons/io5";

const page = () => {
  const { category } = useParams();
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
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-1/2">
            <div className="p-4 relative">
              <div className="relative">
                <Image
                  src={Product}
                  className="w-full rounded-lg"
                  alt="product image"
                />
                <div className="p-1 bg-main rounded-full absolute right-2 top-2">
                  <IoHeartOutline size={19} className="stroke-white p-0" />
                </div>
              </div>

              <h1 className="font-bold pt-2 text-xs truncate">
                Embroidered Polo Shirt Men's High-End
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
              </div>
              <p className="font-semibold font-sans text-xl">₦8,500</p>
              <Image
                className="absolute bottom-6 right-6"
                src={Tag}
                alt="tag"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default page;
