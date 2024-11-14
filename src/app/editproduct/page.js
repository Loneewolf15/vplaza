"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import client from "../sanity/sanityClient";

const page = () => {  
  const router = useRouter();
  const [selectedState, setSelectedState] = useState("new");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product_name, setProductName] = useState("");
  const [amount, setPrice] = useState("");
  const [product_desc, setDescription] = useState("");
  const [product_cat, setCategory] = useState("");
  const [product_id, setProductId] = useState(""); 
  const fileInputRef = useRef(null);
  const requestID = "rid_1983";

  useEffect(() => {
    const productToEdit = JSON.parse(localStorage.getItem("editProduct"));
    if (productToEdit) {
      setProductName(productToEdit.product_name || "");
      setPrice(productToEdit.amount || "");
      setDescription(productToEdit.product_desc || "");
      setCategory(productToEdit.product_cat || "");
      setSelectedState(productToEdit.selectedState || "new");
      setProductId(productToEdit.id || "");

      const existingImages = [];
      for (let i = 1; i <= 5; i++) {
        const imgKey = `product_img${i}`;
        if (productToEdit[imgKey]) {
          existingImages.push(productToEdit[imgKey]);
        }
      }
      setImagePreviews(existingImages);
    }
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      if (file.size <= 2 * 1024 * 1024) {
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

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let finalImageUrls = [...imagePreviews];
      
      if (imageFiles.length > 0) {
        const newImageUrls = await Promise.all(
          imageFiles.map((file) => uploadImageToSanity(file))
        );
        finalImageUrls = [...finalImageUrls, ...newImageUrls];
      }

      const dataToSend = {
        product_id,
        product_name,
        amount,
        product_desc,
        product_cat,
        selectedState,
        requestID,
        ...finalImageUrls.reduce((acc, url, index) => {
          acc[`product_img${index + 1}`] = url;
          return acc;
        }, {}),
      };

      console.log("Updating product with data:", dataToSend);

      const response = await axios.put(
        "https://api.vplaza.com.ng/products/updateProduct",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully");
        localStorage.removeItem("editProduct");
        router.push("/shop");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-6 bg-[#D9D9D9] rounded-lg shadow-lg w-full min-h-screen">
      {/* ... (rest of the JSX remains the same) ... */}
    </div>
  );
};

export default page; 
