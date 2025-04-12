import React, { useEffect } from "react";
import NavBar from "../shared/NavBar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/lib/axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          {
            withCredentials: true,
          }
        );
        dispatch(setApplicants(res.data.job));
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <NavBar />
      <div className="max-w-6xl mx-auto mt-10 p-6 rounded-lg bg-zinc-900 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-white">
          Applicants{" "}
          <span className="text-gray-300">
            ({applicants?.applications?.length || 0})
          </span>
        </h1>

        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
