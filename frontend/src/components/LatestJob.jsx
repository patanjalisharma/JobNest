import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJob = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        <span className="text-gray-200">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {allJobs.length <= 0 ? (
          <span className="text-gray-400">Jobs not found</span>
        ) : (
          allJobs.slice(0, 6).map(job => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJob;
