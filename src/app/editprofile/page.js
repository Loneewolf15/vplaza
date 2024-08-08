"use client";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Edit } from "../../assets";
import axios from "axios"; // Import axios for HTTP requests
import client from "../sanity/sanityClient"; // Import Sanity client configuration

const Page = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Upload image to Sanity.io
      const imageUrl = await uploadImageToSanity(imageFile);
      const token = localStorage.getItem("token");
      console.log(token);

      // Send data to your PHP backend API
      const response = await axios.post("http://localhost/testapi/", {
        imageUrl,
        fullName,
        gender,
        phoneNumber,
        servicesOffered,
      });

      if (response.status === 200) {
        alert("Profile updated successfully");
        router.push("/");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile");
    }
  };

  const uploadImageToSanity = async (file) => {
    try {
      const uploadResponse = await client.assets.upload("image", file, {
        filename: file.name,
      });
      return uploadResponse.url; // Return the URL of the uploaded image
    } catch (error) {
      throw new Error("Failed to upload image to Sanity.io");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="w-full h-full">
      <div className="bg-[#004AAD] pt-4 w-full h-[15%]">
        <IoArrowBack color="white" className="mt-4 ml-3" size={30} />
        <div className="text-white font-bold text-xl ml-8 mt-6">
          Edit Profile
        </div>
        <div className="bg-white h-[95%] rounded-tr-[50px] rounded-tl-[50px] mt-[5%]">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col items-center"
          >
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="mt-3" onClick={triggerFileInput}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-32 h-32 object-cover mb-4 rounded-full"
                />
              ) : (
                <div className="w-32 h-32 relative mb-4">
                  <Image
                    src={Edit}
                    alt="Upload"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
            <div className="w-[100%]">
              <div className="ml-[10%] mt-4">Full Name:</div>
            </div>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your Full Name"
              type="text"
              className="w-[80%] opacity-40 border-2 rounded-lg pl-3 h-[45px] border-black"
            />
            <div className="w-[100%]">
              <div className="ml-[10%] mt-4">Gender:</div>
            </div>
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Enter your Gender"
              type="text"
              className="w-[80%] opacity-40 border-2 rounded-lg pl-3 h-[45px] border-black"
            />
            <div className="w-[100%]">
              <div className="ml-[10%] mt-4">Phone Number:</div>
            </div>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your Phone number"
              type="text"
              className="w-[80%] opacity-40 border-2 rounded-lg pl-3 h-[45px] border-black"
            />
            <div className="w-[100%]">
              <div className="ml-[10%] mt-4">Service offered (optional):</div>
            </div>
            <input
              value={servicesOffered}
              onChange={(e) => setServicesOffered(e.target.value)}
              placeholder="Enter services you offer"
              type="text"
              className="w-[80%] opacity-40 border-2 rounded-lg pl-3 h-[45px] border-black"
            />
            <div
              onClick={handleSave}
              className="bg-[#004AAD] w-[90%] mt-16 text-center font-bold text-lg h-[45px] rounded-lg text-white py-2"
            >
              Save
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
