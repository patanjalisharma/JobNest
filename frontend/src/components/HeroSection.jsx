import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center pt-16 pb-10 px-4 bg-[#0a0a0a]">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-zinc-900 text-gray-300 font-medium text-sm">
          Number 1 job hunt website
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Search, apply & <br /> Get your{" "}
          <span className="text-gray-400">dream job</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg">
          Search, apply, and <span className="text-gray-200">land your dream job with ease.</span>
        </p>
        <div className="flex w-full max-w-xl mx-auto border border-zinc-800 bg-zinc-900 pl-4 rounded-full items-center gap-2 sm:gap-4 shadow-md">
          <input
            type="text"
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none border-none text-white placeholder:text-gray-500 w-full py-3 text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-r-full rounded-l-none px-4 h-12 flex items-center justify-center"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
