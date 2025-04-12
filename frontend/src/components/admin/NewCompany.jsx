import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const NewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      return toast.error("Please enter a company name.");
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/company/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <NavBar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Company Name</h1>
          <p className="text-zinc-400 text-sm">
            What would you like to name your company? You can always change this later.
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-sm">Company Name</Label>
          <Input
            type="text"
            placeholder="JobHunt, Microsoft etc"
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-zinc-900 border-zinc-700 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-zinc-100"
          />
        </div>

        <div className="flex items-center gap-4 mt-10">
          <Button
            onClick={() => navigate("/admin/company")}
            variant="outline"
            className="border-zinc-700 text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewCompany;
