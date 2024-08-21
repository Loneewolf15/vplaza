"use client";

import { BB, Product, Tag } from "@/assets";
import Button from "@/components/button";
import Delete from "@/components/delete";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { FaClipboard, FaPencilAlt, FaStar } from "react-icons/fa";
import { FiCopy, FiSettings } from "react-icons/fi";
import { IoMdClipboard } from "react-icons/io";
import {
  IoAddCircleOutline,
  IoAddOutline,
  IoClipboard,
  IoTrashBin,
} from "react-icons/io5";

const page = () => {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <main>
      <section className="pt-8 pb-4 px-4 flex flex-col  text-2xl border-b-main border-b-4">
        <h1 className="font-bold font-sans text-center">Your Store</h1>
        <div className="my-4 gap-2 items-center flex">
          <Image
            alt="store owner"
            src={BB}
            className="w-36 h-36 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-sans font-bold">Steralizer</h2>
            <p className="text-xs">Bursting your head with delicious meal</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <Button className="flex gap-1 px-2 py-1 text-sm items-center">
                <FaPencilAlt size={12} /> Edit
              </Button>
              <Button
                onClick={() => router.push("/store/food")}
                className="flex gap-1 px-2 py-1 text-sm items-center"
              >
                Switch to food
              </Button>
              <Button className="flex gap-1 px-2 py-1 text-sm items-center">
                <AiFillSetting size={12} /> Offer a service
              </Button>
            </div>
          </div>
        </div>
        <div className="flex mt-8 justify-between items-center">
          <Button
            variant="plain"
            className="flex gap-1 px-2 py-1 text-xs items-center"
          >
            <FiCopy size={16} /> Copy Store Link
          </Button>
          <Button
            variant="plain"
            className="flex gap-1 px-2 py-1 text-xs items-center"
          >
            <IoAddCircleOutline size={16} /> Add New Product
          </Button>
        </div>
      </section>
      <section className="flex mt-2 flex-wrap">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-4/12">
            <div className="p-2 relative">
              <div className="relative">
                <Image
                  src={Product}
                  className="w-full rounded-lg"
                  alt="product image"
                />
                <IoTrashBin
                  size={24}
                  onClick={() => setDeleteModal((prev) => !prev)}
                  className="absolute bottom-0 fill-main right-0 bg-white p-1"
                />
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
              <p className="font-semibold font-sans text-sm">₦8,500</p>
              <Image
                className="absolute w-[24px] h-[12px] bottom-6 right-2"
                src={Tag}
                alt="tag"
              />
            </div>
          </div>
        ))}
      </section>
      {deleteModal && <Delete />}
    </main>
  );
};

export default page;
