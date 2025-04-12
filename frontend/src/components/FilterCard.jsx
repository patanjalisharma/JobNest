import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Noida", "Mumbai", "Pune", "Banglore", "Gurgaon"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "50-90k", "1-5L", "5-10L", "10-20L", "20L+"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full p-4 rounded-xl border bg-zinc-900 border-zinc-800 text-white sticky top-0">
      <h1 className="font-bold text-lg mb-2">Filter Jobs (Coming Soon)</h1>
      <hr className="border-gray-600 mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold text-md mb-3">{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, subIndex) => (
              <div key={subIndex} className="flex items-center gap-2 mb-2">
                {/* Disabled radio item to prevent interaction */}
                <RadioGroupItem id={`${item}-${index}`} disabled />
                <Label htmlFor={`${item}-${index}`} className="text-gray-300 cursor-default">
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
