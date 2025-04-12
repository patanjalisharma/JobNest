import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/lib/axios";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-xl">
      <Table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <TableCaption className="text-gray-400 text-sm py-2">
          A list of your applicants
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Full Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Contact No</TableHead>
            <TableHead className="text-gray-300">Resume</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="even:bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
              >
                <TableCell className="text-gray-200">
                  {item?.applicant?.fullName}
                </TableCell>
                <TableCell className="text-gray-400">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="text-gray-400">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-400">
                  {item?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full  hover:bg-zinc-600 transition">
                      <MoreHorizontal className="text-gray-400" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-zinc-900 text-white rounded-md shadow-md p-2 w-[9vw]">
                      {shortListingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          className="cursor-pointer hover:bg-zinc-700 p-2 rounded-md transition"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-white py-4"
              >
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
