import { Product } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoFilter, IoSearch } from "react-icons/io5";
import { MdFilter } from "react-icons/md";

const page = () => {
  return (
    <main className="pt-8 px-2">
      <Header title="Food" />
      <div className="bg-[#D9D9D9] flex items-center gap-1 my-4 p-2 relative rounded-xl">
        <IoSearch size={20} className="shrink-0" fill="#979797" />
        <input className="bg-transparent shrink min-w-0 max-w-full outline-none flex-1" />
      </div>
      <div className="flex justify-start gap-2 my-4">
        {/** Filter */}
        <div className="flex gap-1 items-center rounded-full px-2 text-main text-xs border-main border-2">
          Filter <FiFilter className="fill-main stroke-none " />
        </div>
        {/** Food */}
        <div className="flex gap-1 items-center rounded-full px-4 text-main text-xs border-main border-2">
          Food
        </div>
        {/** Store */}
        <div className="flex gap-1 items-center rounded-full px-4 text-main text-xs border-main border-2">
          Stores
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="flex gap-4 p-2 mb-4 items-center bg-[#EFEFEF] rounded-lg"
          key={index}
        >
          <Image src={Product} className="w-28 h-28 rounded-lg" />
          <div className="p-4 shrink-0 flex-1">
            <h1 className="font-bold text-sm md:text-3xl">
              Bolonese SPag and Meat Balls
            </h1>
            <p className="text-xs mb-2">Chipmarci</p>
            <div className="relative">
              <p className="flex items-center text-xs gap-1">
                4.3
                <span className="inline-block">
                  <FaStar size={10} className="fill-main" />
                </span>
              </p>
              <p className="font-sans text-main font-semibold text-lg">
                ₦8,500
              </p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default page;
