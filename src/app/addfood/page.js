"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import client from "../sanity/sanityClient";
import "../../../dev/styles.css";

const Page = () => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState("new");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product_name, setProductName] = useState("");
  const [amount, setPrice] = useState("");
  const [product_desc, setDescription] = useState("");
  const [product_cat, setCategory] = useState("");
  const fileInputRef = useRef(null);
let requestID = "rid_1983";
const userData = JSON.parse(localStorage.getItem("userData"));
  // Handle image upload with file size limit
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.size <= 2 * 1024 * 1024) {
        // Check if file size is <= 2MB
        return true;
      } else {
        alert(`${file.name} is larger than 2MB and will not be uploaded.`);
        return false;
      }
    });

    const newImagePreviews = validFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);
    setImageFiles((prev) => [...prev, ...validFiles]);
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleAddImageFromButton = (index) => {
    fileInputRef.current.click();
  };

  const uploadImageToSanity = async (file) => {
    try {
      const uploadResponse = await client.assets.upload("image", file, {
        filename: file.name,
      });
      return uploadResponse.url;
    } catch (error) {
      throw new Error("Failed to upload image to Sanity.io");
    }
  };

  const handleSavet = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImageToSanity(file))
      );

      const response = await axios.post(
        "https://api.vplaza.com.ng/products/createProduct",
        {
          imageUrls,
          product_name,
          amount,
          product_desc,
          product_cat,
         // selectedState,
          requestID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        alert("Product added successfully");
        router.push("/");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error uploading to Sanity:", error);

      // If error occurs while uploading to Sanity, send the actual image files to createProduct2 endpoint
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        imageFiles.forEach((file, index) => {
          formData.append(`image${index}`, file);
        });
        formData.append("product_name", productName);
        formData.append("amount", amount);
        formData.append("product_desc", product_desc);
        formData.append("product_cat", product_cat);
        //formData.append("selectedState", selectedState);
        formData.append("requestID", requestID);
        const fallbackResponse = await axios.post(
          "https://api.vplaza.com.ng/products/createProduct2",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (fallbackResponse.status === 200) {
          alert("Product added successfully using fallback endpoint");
          router.push("/");
        } else {
          alert("Failed to add product using fallback endpoint");
        }
      } catch (fallbackError) {
        console.error("Error with fallback upload:", fallbackError);
        alert("Failed to add product");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImageToSanity(file))
      );
  
      // Prepare data for the backend
      const dataToSend = {
        product_name,
        amount,
        product_desc,
        product_cat,
       // selectedState,
        requestID,
        // Dynamically setting product_img fields based on the number of images
        ...imageUrls.reduce((acc, url, index) => {
          acc[`product_img${index + 1}`] = url;
          return acc;
        }, {}),
      };
  
      // Console log the data being sent
      console.log("Data being sent to the backend:", dataToSend);
  
      const response = await axios.post(
        "https://api.vplaza.com.ng/products/createFoodProduct",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log(response);
        alert("Food added successfully");
        router.push("/");
      } else {
        alert("Failed to add food");
      }
    } catch (error) {
      console.error("Error uploading to Sanity:", error);
  
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
  
        // Add image files dynamically to formData
        imageFiles.forEach((file, index) => {
          formData.append(`product_img${index + 1}`, file);
        });
        formData.append("product_name", product_name);
        formData.append("amount", amount);
        formData.append("product_desc", product_desc);
        formData.append("product_cat", product_cat);
      //  formData.append("selectedState", selectedState);
        formData.append("requestID", requestID);
  
        // Console log the formData being sent
        console.log("FormData being sent to the fallback endpoint:", formData);
  
        const fallbackResponse = await axios.post(
          "https://api.vplaza.com.ng/products/createFoodProduct",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (fallbackResponse.status === 200) {
          alert("Food added successfully using fallback endpoint");
          router.push("/");
        } else {
          alert("Failed to add Food using fallback endpoint");
        }
      } catch (fallbackError) {
        console.error("Error with fallback upload:", fallbackError);
        alert("Failed to add Food");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative flex flex-col items-center p-6 bg-[#D9D9D9] rounded-lg shadow-lg w-full min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="loader">Uploading Food...</div>
        </div>
      )}

      <div className="flex items-center w-full mb-6">
        <IoArrowBack
          onClick={() => router.back()}
          color="black"
          className="mr-4"
          size={30}
        />
        <h1 className="text-3xl font-extrabold">New Food</h1>
      </div>

      <div className="relative w-full h-48 border-4 border-dashed border-bg-[#004AAD]-300 flex items-center justify-center mb-6 bg-gray-300 rounded-lg transition-transform transform hover:scale-105">
        {imagePreviews.length > 0 ? (
          <img
            src={imagePreviews[0]}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-lg" onClick={handleAddImageClick}>
            Click to add a picture
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          multiple
        />
      </div>

      <div className="flex space-x-2 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative w-16 h-16">
            {imagePreviews[index + 1] ? (
              <img
                src={imagePreviews[index + 1]}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover border border-gray-500 rounded-md"
              />
            ) : (
              <button
                onClick={() => handleAddImageFromButton(index + 1)}
                className="w-full h-full flex items-center justify-center bg-gray-500 text-white border border-gray-500 rounded-md hover:bg-gray-400 transition"
              >
                <AiOutlinePlus size={20} />
              </button>
            )}
          </div>
        ))}
        <span className="text-gray-500">Max of 5 pictures</span>
      </div>

      <input
        type="text"
        placeholder="Product name"
        value={product_name}
        onChange={(e) => setProductName(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-bg-[#004AAD]-600"
      />
      {/* <div className="flex items-center mb-4 w-full">
        <label className="mr-2 text-gray-500 font-semibold">
          Select State:
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="state"
              value="new"
              checked={selectedState === "new"}
              onChange={() => setSelectedState("new")}
              className="form-radio text-bg-[#004AAD]-600"
            />
            <span className="text-gray-500">New</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="state"
              value="used"
              checked={selectedState === "used"}
              onChange={() => setSelectedState("used")}
              className="form-radio text-bg-[#004AAD]-600"
            />
            <span className="text-gray-500">Used</span>
          </label>
        </div>
      </div> */}
      <select
        value={product_cat}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-bg-[#004AAD]-600"
      >
        <option value="">Categories</option>
        <option value="furniture">Furniture</option>
        <option value="accessories">Accessories</option>
        <option value="phones">Phones</option>
        <option value="food">Food</option>
        <option value="electronics">Electronics</option>
        <option value="tops">Tops</option>
        <option value="pants">Pants</option>
        <option value="women">Women</option>
        <option value="services">Services</option>
      </select>

      <input
        type="text"
        placeholder="Price"
        value={amount}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-bg-[#004AAD]-600"
      />

      <textarea
        placeholder="Description"
        value={product_desc}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-bg-[#004AAD]-600"
      ></textarea>

      <div
        className="bg-[#004AAD] w-full text-center font-bold text-lg rounded-lg text-white py-2 mt-2 cursor-pointer"
        onClick={handleSave}
      >
        Add
      </div>
    </div>
  );
};

export default Page;
