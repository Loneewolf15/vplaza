"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
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

const Page = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const userDatax = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const tken = localStorage.getItem("token");
    setToken(tken);
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const tkenn = localStorage.getItem("token");
      const requestID = "rid_1983"; // Generate request ID
      
      // Retrieve user data from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
  
      let endpoint = "";
      let requestData = {
        requestID,
      };
  
      if (tkenn) {
        // If token exists, use the 'getProductByUni' endpoint
        endpoint = "https://api.vplaza.com.ng/products/getProductByUni";
        
        // Dynamically set the university from localStorage (userData)
        if (userData && userData.user_location) {
          requestData.university = userData.user_location;
        } else {
          console.error("University location not found in userData");
          return; // Exit if no university location found
        }
      } else {
        // If no token exists, use the 'getAllProducts' endpoint
        endpoint = "https://api.vplaza.com.ng/products/getAllProducts";
      }
  
      const config = tkenn
        ? {
            headers: {
              Authorization: `Bearer ${tkenn}`,
            },
          }
        : {};
  
      // Log the request configuration before sending the request
      console.log("Request Config:", {
        endpoint,
        requestData,
        config,
      });
  
      try {
        const response = await axios.post(endpoint, requestData, config);
  
        // Log the response from the API
        console.log(`Response from endpoint: ${endpoint}`, response);
  
        // Check if the response contains the message "no product from this university"
        if (response.data.status === false && response.data.message === "no product from this university") {
          setError("No products are available from this university. Please check back later or select a different location.");
        } else {
          const fetchedItems = shuffleArray(response.data);
  
          if (tkenn) {
            // Show only the first 25 products when logged in
            setItems(fetchedItems.slice(0, 25));
          } else {
            setItems(fetchedItems);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Please try again later, we're having trouble fetching the list of products.");
      }
    };
  
    fetchItems();
  }, []);
  

  const handleViewMoreProducts = () => {
    if (!token) {
      router.push("/signin");
    } else {
      // Fetch more products logic (if needed)
      console.log("Fetching more products...");
    }
  };

  const ProductList = ({ items }) => {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 w-full gap-4">
          {Array.isArray(items) &&
            items.map((item, index) => (
              <div
                onClick={() => {
                  if (!token) {
                    router.push("/signin");
                  } else {
                    router.push(`/product/${item._id}`);
                  }
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
                    <IoStarSharp
                      color="#FFF500"
                      className="mt-[2px] pl-[2px]"
                    />
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
        {token && items.length === 25 && (
          <div
            className="text-center mt-4 text-blue-600 cursor-pointer"
            onClick={handleViewMoreProducts}
          >
            View More Products
          </div>
        )}
      </div>
    );
  };


  const handleCategoryClick = async (category) => {
    const tkenn = localStorage.getItem("token");
    const requestID = "rid_1983"; // Generate request ID
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    // Ensure userData and university are available
    if (!userData || !userData.user_location) {
      console.error("University location not found in userData");
      return; // Exit if no university location found
    }
  
    const university = userData.user_location;
  
    const endpoint = "https://api.vplaza.com.ng/products/getProductByUniCat";
    const requestData = {
      requestID,
      university,
      category, // The selected category (passed dynamically)
    };
  
    const config = tkenn
      ? {
          headers: {
            Authorization: `Bearer ${tkenn}`,
          },
        }
      : {};
  
    // Log the request configuration before sending the request
    console.log("Sending request:", {
      endpoint,
      requestData,
      config,
    });
  
    try {
      const response = await axios.post(endpoint, requestData, config);
      
      console.log("Response data:", response.data);
      
      // Pass the fetched data to another page (e.g., ProductListPage)
      router.push({
        pathname: "/product-list", // The page to navigate to
        query: { category, products: JSON.stringify(response.data) }, // Pass data as query params
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      {/* Main Content */}
      <div>
        {/* Search Nav */}
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
            {userDatax.user_location}
          </div>
        </div>
        <div className="w-full px-4 bg-[#004AAD]">
          <div className="text-center w-full text-xl pt-3 text-white">
            Categories
          </div>
        <div>
    <div className="flex w-full items-center justify-center mt-2 gap-5">
      <div onClick={() => handleCategoryClick("phones")}>
        <Image src={Five} alt="Phones" />
        <div className="text-sm text-center text-white font-medium">
          Phones
        </div>
      </div>
      <div onClick={() => handleCategoryClick("furnitures")}>
        <Image src={Six} alt="Furnitures" />
        <div className="text-sm text-center text-white font-medium">
          Furnitures
        </div>
      </div>
      <div onClick={() => handleCategoryClick("electronics")}>
        <Image src={Seven} alt="Electronics" />
        <div className="text-sm text-center text-white font-medium">
          Electronics
        </div>
      </div>
      <div onClick={() => handleCategoryClick("tops")}>
        <Image src={Eight} alt="Tops" />
        <div className="text-sm text-center text-white font-medium">
          Tops
        </div>
      </div>
    </div>
    {/* Next row */}
    <div className="flex w-full items-center justify-center mt-2 gap-5">
      <div onClick={() => handleCategoryClick("pants")}>
        <Image src={Nine} alt="Pants" />
        <div className="text-sm text-center text-white font-medium">
          Pants
        </div>
      </div>
      <div onClick={() => handleCategoryClick("dress")}>
        <Image src={Ten} alt="Dress" />
        <div className="text-sm text-center text-white font-medium">
          Dress
        </div>
      </div>
      <div onClick={() => handleCategoryClick("accessories")}>
        <Image src={Twelve} alt="Accessories" />
        <div className="text-sm text-center text-white font-medium">
          Accessories
        </div>
      </div>
      <div onClick={() => handleCategoryClick("food")}>
        <Image src={Thirteen} alt="Food" />
        <div className="text-sm text-center text-white font-medium">
          Food
        </div>
      </div>
    </div>
    {/* Next row */}
    <div className="flex w-full items-center justify-center mt-2 gap-5">
      <div onClick={() => handleCategoryClick("services")}>
        <Image src={Fourteen} alt="Services" />
        <div className="text-sm text-center text-white font-medium">
          Services
        </div>
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
        {error ? (
          <div className="text-center text-red-600 font-medium mt-4">
            {error}
          </div>
        ) : (
          <ProductList items={items} />
        )}
      </div>
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

export default Page;
