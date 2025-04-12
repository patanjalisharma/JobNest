import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      return toast.error("Please select a company.");
    }
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <NavBar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>Salary (LPA)</Label>
              <Input
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>Experience (Years)</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-zinc-700 text-zinc-100"
              />
            </div>
          </div>

          <div className="w-full">
            <Label>Select Company</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100 w-full mt-1">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-100">
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem
                      key={company._id}
                      value={company.name.toLowerCase()}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {companies.length === 0 && (
            <p className="text-red-400 text-sm">
              Please register a company first before posting a job.
            </p>
          )}

          {loading ? (
            <Button
              disabled
              className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-500"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
              Post Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
