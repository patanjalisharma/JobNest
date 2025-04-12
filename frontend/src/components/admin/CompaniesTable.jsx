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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies?.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl mt-6 shadow-md">
      <Table className="w-full">
        <TableCaption className="text-zinc-500 text-sm py-2">
          A list of your registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b border-zinc-700">
            <TableHead className="text-zinc-300 px-4 py-3">Logo</TableHead>
            <TableHead className="text-zinc-300 px-4 py-3">Name</TableHead>
            <TableHead className="text-zinc-300 px-4 py-3">Date</TableHead>
            <TableHead className="text-zinc-300 px-4 py-3 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!companies || companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-zinc-400 py-6 italic">
                You have not registered any companies yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="even:bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
              >
                {/* Logo */}
                <TableCell className="px-4 py-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>

                {/* Name */}
                <TableCell className="px-4 py-3 text-zinc-200 font-bold">
                  {company.name}
                </TableCell>

                {/* Date */}
                <TableCell className="px-4 py-3 text-zinc-400">
                  {company.createdAt.split("T")[0]}
                </TableCell>

                {/* Actions */}
                <TableCell className="px-4 py-3 text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-full hover:bg-zinc-700 transition">
                      <MoreHorizontal className="text-zinc-400" />
                    </PopoverTrigger>
                    <PopoverContent className="p-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-md">
                      <div
                        onClick={() => navigate(`/admin/company/${company._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-zinc-700 px-3 py-2 rounded-md transition"
                      >
                        <Edit2 className="text-zinc-300" size={16} />
                        <span className="text-zinc-300 text-sm">Edit</span>
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

export default CompaniesTable;
