import React, { useEffect } from "react";
import NavBar from "../shared/NavBar";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/lib/axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [input, setInput] = useState({
      fullName: "",
      email:"",
      phoneNumber:"",
      password:"",
      role:"",
      file:"",
    })

    const { loading, user } = useSelector((state) => state.auth);
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    
  
    const changeEventHandler = (e)=> {
      setInput({...input, [e.target.name]: e.target.value})
    }
  
    const changeFileHandler = (e)=> {
      setInput({...input, file:e.target.files?.[0]})
    }

    const submitHandler = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("fullName", input.fullName)
      formData.append("email", input.email)
      formData.append("password", input.password)
      formData.append("role", input.role)
      formData.append("phoneNumber", input.phoneNumber)

      if (input.file){
        formData.append("file" ,input.file)
      }
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        })
        if(res.data.success) {
          navigate("/login")
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || "Something went wrong")
      } finally {
        dispatch(setLoading(false))
      }
    }
    
      useEffect(() => {
        if(user) {
          navigate("/")
        }
      })
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <NavBar />

      <div className="flex flex-1 items-center justify-center px-4 ">
        <form onSubmit={submitHandler} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h1 className="font-bold text-2xl text-center mb-6 text-gray-700">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="text-gray-600">Full Name</Label>
            <Input type="text" placeholder="Full Name" className="mt-1 w-full" value={input.fullName} name="fullName" onChange={changeEventHandler}/>
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-gray-600">Email</Label>
            <Input type="email" placeholder="Email" className="mt-1 w-full" value={input.email} name="email" onChange={changeEventHandler} />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-gray-600">Password</Label>
            <Input type="password" placeholder="••••••••" className="mt-1 w-full" value={input.password} name="password" onChange={changeEventHandler}/>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label className="text-gray-600">Phone Number</Label>
            <Input type="tel" placeholder="+91 ##########" className="mt-1 w-full" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}/>
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <Label className="text-gray-600">Select Role</Label>
            <RadioGroup className="flex items-center gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="user"  className="cursor-pointer" checked={input.role === "user"} onChange={changeEventHandler} />
                <Label htmlFor="user" className="text-gray-700 cursor-pointer">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="admin" className="cursor-pointer" checked={input.role === "admin"} onChange={changeEventHandler}/>
                <Label htmlFor="admin" className="text-gray-700 cursor-pointer">Admin</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Upload */}
          <div className="mb-4">
            <Label className="text-gray-600">Profile Picture</Label>
            <div className="relative flex items-center justify-center  rounded-md p-2">
              <Input accept="image/*" type="file" className="cursor-pointer w-full" onChange={changeFileHandler}/>
            </div>
          </div>

          {loading ? (
            <Button className="w-full text-white py-2 mt-4 rounded-md transition cursor-not-allowed">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full text-white py-2 mt-4 rounded-md transition cursor-pointer">
              SignUp
            </Button>
          )}

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Already have an account? 
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


