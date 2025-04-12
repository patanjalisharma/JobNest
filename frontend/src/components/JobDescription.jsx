import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/lib/axios";
import { setSingleJob } from "@/redux/jobSlice"; 
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const JobDescription = () => {
  const {singleJob} = useSelector(store=>store.job)
  const {user} = useSelector(store=>store.auth)
  
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id || false);
  const [isApplied, setApplied] = useState(isInitiallyApplied)
  const params = useParams();
  const jobId = params.id
  
  const dispatch = useDispatch()

  const applyJobHandler = async() => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true
      });
      if(res.data.success) {
        setApplied(true)
        const updateSingleJob =  {...singleJob, applications: [...singleJob.applications,{applicant: user?._id}]}
        dispatch(setSingleJob(updateSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }
  useEffect(() => {
    const fetchSingleJob = async() => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                withCredentials:true,
            })

            if(res.data.success) {
                dispatch(setSingleJob(res.data.job))
                setApplied(res.data.job.applications?.some(application => application.applicant === user?._id || false))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    fetchSingleJob()
 },[jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-zinc-900 text-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Badge className="text-orange-500 font-bold bg-gray-700 border border-orange-500">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-blue-400 font-bold bg-gray-700 border border-blue-400">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-green-500 font-bold bg-gray-700 border border-green-500">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <Button onClick={isApplied ? null : applyJobHandler}
          className={`rounded-lg cursor-pointer px-5 py-2 text-white font-semibold ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details Section */}
      <h1 className="text-xl font-semibold text-gray-300 mb-3">Job Details</h1>
      <div className="space-y-2 text-gray-400">
        <p>
          <span className="font-bold text-gray-200">Role:</span> {singleJob?.title}
        </p>
        <p>
          <span className="font-bold text-gray-200">Location:</span> {singleJob?.location}
        </p>
        <p>
          <span className="font-bold text-gray-200">Description:</span> {singleJob?.description}
        </p>
        <p>
          <span className="font-bold text-gray-200">Experience:</span> {singleJob?.experienceLevel} years
        </p>
        <p>
          <span className="font-bold text-gray-200">Salary:</span> {singleJob?.salary} LPA
        </p>
        <p>
          <span className="font-bold text-gray-200">Total Applicants:</span> {singleJob?.applications?.length}
        </p>
        <p>
          <span className="font-bold text-gray-200">Posted Date:</span> {singleJob?.createdAt?.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;

