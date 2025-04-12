import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Graphic Designer",
  "Full Stack Developer",
  "Python Developer",
  "Java Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-4">
      <Carousel className="w-full max-w-2xl mx-auto my-20">
        <CarouselContent>
          {category.map((category, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 px-2">
              <Button
                onClick={() => searchJobHandler(category)}
                className=" ms-2 rounded-full w-full text-white bg-zinc-900 hover:bg-zinc-800 transition"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-black" />
        <CarouselNext className="text-black" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
