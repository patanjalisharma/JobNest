import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-xl transition duration-200 text-white">
      {/* Company Info */}
      <div>
        <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-400">India</p>
      </div>

      {/* Job Title & Description */}
      <div className="mt-3">
        <h2 className="font-bold text-xl">{job.title}</h2>
        <p className="text-sm text-gray-400 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Job Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-orange-400 font-semibold bg-zinc-800 border border-orange-500">
          {job?.position} Position
        </Badge>
        <Badge className="text-blue-400 font-semibold bg-zinc-800 border border-blue-400">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-400 font-semibold bg-zinc-800 border border-green-500">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
