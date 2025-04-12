import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <NavBar />

      <div className="max-w-6xl mx-auto my-10 p-6 rounded-2xl bg-zinc-900 shadow-xl border border-zinc-800">
        {/* Search and New Company Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <Input
            className="bg-zinc-800 border border-zinc-700 text-gray-100 placeholder-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg px-4 py-2 w-full transition"
            placeholder="Search companies..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition w-full md:w-auto"
            onClick={() => navigate("/admin/company/create")}
          >
            + New Company
          </Button>
        </div>

        {/* Companies Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
