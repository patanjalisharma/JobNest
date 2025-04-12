import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({job}) => {

  const navigate = useNavigate();
  

  const daysAgo =(mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentDate = new Date()
    const timeDiff = Math.abs(currentDate - createdAt)
    return Math.floor(timeDiff / (1000 * 60* 60 * 24))
  }
  return (
    <div className="p-6 rounded-lg shadow-lg bg-zinc-900 border border-zinc-800 text-white">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">{daysAgo(job?.createdAt) === 0 ?  "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full cursor-pointer border-gray-600" size="icon">
          <Bookmark className="text-black" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-bold text-lg">{job?.company?.name}</h1>
          <p className="text-gray-400 text-sm">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-xl my-2">{job?.title}</h1>
        <p className="text-gray-400 text-sm">
        {job?.description}
        </p>
      </div>

      {/* Job Badges */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-orange-500 font-bold bg-gray-700 border border-orange-500">
        {job?.position} Positions
        </Badge>
        <Badge className="text-blue-400 font-bold bg-gray-700 border border-blue-400">
        {job?.jobType}
        </Badge>
        <Badge className="text-green-500 font-bold bg-gray-700 border border-green-500">
        {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-5">
        <Button onClick={() => navigate(`/description/${job?._id}`)} className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white border border-gray-600">
          Details
        </Button>
        <Button className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white">
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
