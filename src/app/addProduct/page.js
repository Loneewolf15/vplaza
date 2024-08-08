"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import client from "../sanity/sanityClient";
import "../../../dev/styles.css";

const page = () => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState("new");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const fileInputRef = useRef(null);

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

  const handleSave = async () => {
    setLoading(true);
    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImageToSanity(file))
      );

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost/testapi/", {
        imageUrls,
        productName,
        price,
        description,
        category,
        selectedState,
      });

      if (response.status === 200) {
        alert("Product added successfully");
        router.push("/");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-6 bg-[#D9D9D9] rounded-lg shadow-lg w-full min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="loader">Uploading product...</div>
        </div>
      )}

      <div className="flex items-center w-full mb-6">
        <IoArrowBack
          onClick={() => router.back()}
          color="black"
          className="mr-4"
          size={30}
        />
        <h1 className="text-3xl font-extrabold">New Product</h1>
      </div>

      <div className="relative w-full h-48 border-4 border-dashed border-yellow-300 flex items-center justify-center mb-6 bg-gray-300 rounded-lg transition-transform transform hover:scale-105">
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
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      />
      <div className="flex items-center mb-4 w-full">
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
              className="form-radio text-yellow-600"
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
              className="form-radio text-yellow-600"
            />
            <span className="text-gray-500">Used</span>
          </label>
        </div>
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      >
        <option value="">Categories</option>
        <option value="furniture">Furniture</option>
        <option value="utilities">Utilities</option>
        <option value="books">Books</option>
        <option value="food">Food</option>
      </select>

      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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

export default page;
