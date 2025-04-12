import React from 'react';
import NavBar from './shared/NavBar';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { isLoading } = useGetAllJobs();

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl text-white">
          Search Results ({allJobs.length})
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-gray-400">Loading jobs...</span>
          </div>
        ) : allJobs.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400">No jobs match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {allJobs.map((job) => (
              <div key={job._id}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
