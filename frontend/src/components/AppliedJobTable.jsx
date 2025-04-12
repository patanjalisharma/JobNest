import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case "accepted":
      return "bg-green-600 text-white";
    case "pending":
      return "bg-gray-500 text-gray-300";
    case "rejected":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto rounded-xl shadow-md ">
      {appliedJobs.length === 0 ? (
        <p className="text-gray-400 text-sm">You haven’t applied to any jobs yet.</p>
      ) : (
        <Table className="min-w-full border border-zinc-900 text-white">
          <TableCaption className="text-gray-400">
            A list of your applied jobs
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Job Role</TableHead>
              <TableHead className="text-gray-300">Company</TableHead>
              <TableHead className="text-right text-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliedJobs.map((applied) => {
              const status = applied?.status || "pending";
              const badgeClass = getStatusBadgeClass(status);

              return (
                <TableRow
                  key={applied._id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <TableCell>{applied?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{applied?.job?.title}</TableCell>
                  <TableCell className=''>{applied?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${badgeClass} px-3 py-1 capitalize`}>
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobTable;
