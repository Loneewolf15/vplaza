import { IoArrowBack, IoSearch } from "react-icons/io5";

const Header = ({ title }) => {
  return (
    <header className="w-full pt-4">
      <div className="relative text-center">
        <IoArrowBack
          size={30}
          className="absolute top-1/2 -translate-y-1/2 left-0 p-1"
        />
        <h1 className="font-black text-2xl">{title}</h1>
      </div>
      <div className="bg-[#D9D9D9] flex items-center gap-1 my-4 p-2 relative rounded-xl">
        <IoSearch size={20} className="shrink-0" fill="#979797" />
        <input className="bg-transparent shrink min-w-0 max-w-full outline-none flex-1" />
      </div>
    </header>
  );
};

export default Header;
