import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/lib/axios";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const{user} = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill => skill),
        file: user?.profile?.resume
    })

    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const fileChangeHandler = (e) => {
        const file  =e.target.files[0];
        setInput({...input, file})
    }
    const submitHandler = async(e) => {
        e.preventDefault(); 

        const formData = new FormData();
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);

        if(input.file) {
            formData.append('file', input.file);
        }

        try {
          setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile-update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    
                },
                withCredentials: true
            })
            if(res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            } 
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally{
          setLoading(false)
        }
        setOpen(false)
        console.log(input)
    }
  return (
    <div>  
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-lg bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow-lg">
    <DialogHeader className="relative">
      <DialogTitle className="text-2xl font-bold">Update Profile</DialogTitle>
      
    </DialogHeader>

    <form onSubmit={submitHandler} className="space-y-4 mt-2">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm">Name</Label>
        <Input
          id="name"
          name="fullName"
          value={input.fullName}
          onChange={changeEventHandler}
          className="bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:ring-0"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">Email</Label>
        <Input
          id="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          type="email"
          className="bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:ring-0"
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-sm">Phone No.</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={changeEventHandler}
          className="bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:ring-0"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm">Bio</Label>
        <Input
          id="bio"
          name="bio"
          value={input.bio}
          onChange={changeEventHandler}
          className="bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:ring-0"
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label htmlFor="skills" className="text-sm">Skills</Label>
        <Input
          id="skills"
          name="skills"
          value={input.skills}
          onChange={changeEventHandler}
          placeholder="Comma separated e.g. React, Node"
          className="bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:ring-0"
        />
      </div>

      {/* Resume */}
      <div className="space-y-2">
        <Label htmlFor="file" className="text-sm">Resume</Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          onChange={fileChangeHandler}
          className="bg-zinc-800 border-zinc-700 text-white file:bg-gray-700 file:border-0 file:text-white file:cursor-pointer"
        />
      </div>

      <DialogFooter className="pt-4">
        {loading ? (
          <Button disabled className="w-full bg-blue-600 text-white">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white transition">
            Update
          </Button>
        )}
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default UpdateProfileDialog;
