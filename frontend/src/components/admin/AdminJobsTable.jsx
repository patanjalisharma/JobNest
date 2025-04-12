import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(allAdminJobs)) return;

    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.company?.name
        ?.toLowerCase()
        .includes(searchJobByText.toLowerCase());
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="p-4 bg-zinc-900 rounded-xl mt-5">
      <Table className="w-full">
        <TableCaption className="text-zinc-400 text-sm py-3">
          A list of your posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b border-zinc-800">
            <TableHead className="text-zinc-300 text-left px-4 py-3">
              Company Name
            </TableHead>
            <TableHead className="text-zinc-300 text-left px-4 py-3">
              Role
            </TableHead>
            <TableHead className="text-zinc-300 text-left px-4 py-3">
              Date
            </TableHead>
            <TableHead className="text-zinc-300 text-right px-4 py-3">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(!filterJobs || filterJobs.length === 0) ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-zinc-200 py-4">
                You have not posted any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-zinc-800 transition-colors duration-200"
              >
                <TableCell className="px-4 py-3 text-zinc-100 font-bold">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-zinc-100">
                  {job?.title}
                </TableCell>
                <TableCell className="px-4 py-3 text-zinc-400">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full hover:bg-zinc-700 transition">
                      <MoreHorizontal className="text-zinc-400" />
                    </PopoverTrigger>
                    <PopoverContent className="p-2 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl">
                      <div
                        onClick={() => navigate(`/admin/company/${job._id}`)}
                        className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-md cursor-pointer"
                      >
                        <Edit2 className="text-zinc-300" size={16} />
                        <span className="text-zinc-300 text-sm">Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-md cursor-pointer"
                      >
                        <Eye className="text-zinc-300" size={16} />
                        <span className="text-zinc-300 text-sm">
                          Applicants
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
