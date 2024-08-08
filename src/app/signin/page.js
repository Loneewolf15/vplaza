"use client";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    requestID: "rid_1983",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("requestID", formData.requestID);

    try {
      const response = await axios.post(
        "https://api.vplaza.com.ng/users/loginfunc",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("token", response.data.access_token);
      console.log("Success:", response.data);
      const token = localStorage.getItem("token");
      console.log(token);
      router.push("/profile");
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-[#004AAD] pt-4 w-full h-[15%]">
        <IoArrowBack
          color="white"
          className="mt-4 ml-3"
          size={30}
          onClick={() => router.back()}
        />

        <div className="bg-white w-full h-[85%] rounded-tr-[50px] rounded-tl-[50px] mt-[15%]">
          <div className="font-bold text-3xl pt-32 px-8">Log In</div>
          <form onSubmit={handleSubmit} className="w-full px-8">
            <div className="mt-4">
              <label htmlFor="email" className="block ml-[10%]">
                Email:
              </label>
              <input
                placeholder="Enter your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-[80%] opacity-40 border-2 ml-[10%] rounded-lg pl-3 h-[45px] border-black"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block ml-[10%]">
                Password:
              </label>
              <input
                placeholder="Enter your Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-[80%] opacity-40 border-2 ml-[10%] rounded-lg pl-3 h-[45px] border-black"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#004AAD] w-[90%] ml-[5%] mt-16 text-center font-bold text-lg h-[45px] rounded-lg text-white py-2"
            >
              Log In
            </button>
          </form>
          <div className="w-full text-right text-[#004AAD] pr-[5%] font-bold mt-1">
            Forgotten Password?
          </div>
          <div className="font-bold text-center text-md w-full text-wrap mt-12">
            Don't have an Account?{" "}
            <div
              onClick={() => router.push("/signup")}
              className="text-[#004AAD] text-center cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
