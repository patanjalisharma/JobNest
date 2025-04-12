import React, { useState } from "react";
import NavBar from "./shared/NavBar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";

const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen text-white">
      <NavBar />

      <div className="max-w-4xl mx-auto my-8 px-4 space-y-6">
        {/* Profile Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar || "https://images-platform.99static.com//NG9lM1yEWvgz3KU0ujcQy5Hin6g=/669x0:1348x679/fit-in/500x500/99designs-contests-attachments/125/125576/attachment_125576183"} />
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{user?.fullName}</h1>
                <p className="text-gray-400 text-sm">{user?.profile?.bio || "No bio available"}</p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)} variant="outline" className="self-start md:self-center cursor-pointer">
              <Pen className="text-black" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="my-4 space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <Mail className="text-gray-400" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact className="text-gray-400" />
              <span>{user?.phoneNumber || "N/A"}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index} className="bg-gray-700 text-white px-3 py-1">{skill}</Badge>
                ))
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <Label className="text-md font-bold">Resume</Label>
            {user?.profile?.resume ? (
              <div className="mt-1">
                <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {user.profile.resumeOriginalName}
                </a>
              </div>
            ) : (
              <p className="text-gray-400 mt-1">N/A</p>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold mb-3">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
