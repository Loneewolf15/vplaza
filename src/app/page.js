"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Eleven,
  Twelve,
  Thirteen,
  Fourteen,
} from "../assets";
import { IoIosHeart } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { MdStore, MdHomeFilled } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import axios from "axios";
import jwt from "jsonwebtoken";
import { items } from "../../dev/helpers";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const tken = localStorage.getItem("token");
    setToken(tken);
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Retrieve the token from localStorage
  //       const token = localStorage.getItem('token');
  //       console.log(token);

  //       // Perform the GET request with the Bearer token
  //       const response = await axios.get('https://api.vplaza.com.ng/users/getuser', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });

  //       // Handle the response data
  //       setUser(response.data);
  //       console.log(user);
  //     } catch (error) {
  //       // Handle any errors
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array means this useEffect runs once after the initial render

  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     router.push('/signin');
  //     return;
  //   }

  //   try {
  //     jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
  //   } catch (error) {
  //     console.error('Invalid token:', error);
  //     router.push('/signin');
  //     return;
  //   }

  //   const fetchItems = async () => {
  //     try {
  //       const response = await axios.get('https://swif-server.onrender.com/api/products');
  //       setItems(response.data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchItems();
  // }, [router]);

  const ProductList = ({ items }) => {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 w-full gap-4">
          {items.map((item, index) => (
            <div
              onClick={() => {
                router.push(`/product/${item._id}`);
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
                <div className="text-md ">{item.price}</div>
                <div className="text-sm mt-[8px] ml-3 text-[#004AAD] font-medium">
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
      {/* search Nav */}
      <div className="w-full mt-2 px-3 mb-2 justify-between flex">
        <IoIosHeart
          onClick={() => {
            router.push("/wishlist");
          }}
          size={30}
          color="black"
        />
        <input
          type="text"
          value=""
          className="bg-[#D9D9D9] text-sm pl-2 w-full ml-3 rounded-lg"
          placeholder="Search"
        />
        {/* Categories tab */}
        <div className="bg-[#004AAD] text-sm px-3 py-1 text-wrap ml-2 rounded-lg text-white text-center">
          Uniben
        </div>
      </div>
      <div className="w-full px-4 bg-[#004AAD]">
        <div className="text-center w-full text-xl pt-3 text-white">
          Categories
        </div>
        <div className="flex w-full items-center justify-center mt-2 gap-5">
          <div onClick={() => router.push("/category/phones")}>
            <Image src={Five} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Phones
            </div>
          </div>
          <div onClick={() => router.push("/category/furnitures")}>
            <Image src={Six} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Furnitures
            </div>
          </div>
          <div onClick={() => router.push("/category/electronics")}>
            <Image src={Seven} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Electronics
            </div>
          </div>
          <div onClick={() => router.push("/category/tops")}>
            <Image src={Eight} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Tops
            </div>
          </div>
        </div>
        {/* next row */}
        <div className="flex w-full items-center justify-center mt-2 gap-5">
          <div onClick={() => router.push("/category/pants")}>
            <Image src={Nine} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Pants
            </div>
          </div>
          <div onClick={() => router.push("/category/dress")}>
            <Image src={Ten} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Dress
            </div>
          </div>
          <div onClick={() => router.push("/category/accessories")}>
            <Image src={Twelve} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Accessories
            </div>
          </div>
          <div onClick={() => router.push("/category/food")}>
            <Image src={Thirteen} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Food
            </div>
          </div>
        </div>
        {/* next row */}
        <div className="flex w-full items-center justify-center mt-2 gap-5">
          <div onClick={() => router.push("/category/services")}>
            <Image src={Fourteen} alt="Five" />
            <div className="text-sm text-center text-white font-medium">
              Services
            </div>
          </div>
        </div>
      </div>
      {/* Recommend */}
      <div className="px-5 justify-between mt-3 flex">
        <div className="flex font-semibold text-lg">
          Recommended{" "}
          <IoStarSharp className="text-center ml-1 mt-1" color="#FFF500" />
        </div>
        <div className="flex font-semibold text-lg">
          Filter <FaFilter className="text-center ml-1 mt-1" color="black" />
        </div>
      </div>
      <ProductList items={items} />
      {/* Nav FOoter */}
      <div className="w-full  h-[100px] sticky bottom-0 bg-white ">
        <div className="bg-[#004AAD] justify-between flex rounded-2xl w-[90%] ml-[5%] h-[70%]">
          <div className=" flex justify-between ml-[5%] mt-3 w-[90%]">
            {token ? (
              <MdStore
                onClick={() => router.push("/market")}
                color="#686868"
                size={40}
              />
            ) : (
              <MdStore
                onClick={() => router.push("/signin")}
                color="#686868"
                size={40}
              />
            )}
            <div className="h-[50px] w-[50px] rounded-full bg-white text-center items-center justify-center">
              <MdHomeFilled
                color="#004AAD"
                className="ml-[5px] pt-[2px]"
                size={40}
              />
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
    </div>
  );
};

export default page;
