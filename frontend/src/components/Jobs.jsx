import React from "react";
import NavBar from "./shared/NavBar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { isLoading } = useGetAllJobs();

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto mt-5 px-4 ">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[300px]">
            <FilterCard />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-white">Loading jobs...</span>
              </div>
            ) : allJobs.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-white">No jobs found matching your search criteria.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
