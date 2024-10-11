import Image from "next/image";
import Button from "./button";
import { Iphone } from "@/assets";

const Delete = () => {
  return (
    <div className="fixed p-4 bg-black bg-opacity-75 w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="bg-white py-6 px-8 gap-8 flex flex-col justify-center rounded-3xl min-h-16 w-full">
        <h1 className="text-main font-sans font-bold text-lg text-center">
          Delete Item?
        </h1>
        <div className="flex gap-2">
          <Image className="w-[60px] h-[60px]" src={Iphone} />
          <div>
            <h2 className="text-sm font-sans font-bold">
              IPhone 12promax 256GB
            </h2>
            <p className="font-sans font-bold">₦3,000</p>
          </div>
        </div>
        <div className="justify-between items-center flex">
          <Button className="font-sans font-bold">Yes</Button>
          <Button className="font-sans bg-white text-main shadow-lg font-bold">
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
