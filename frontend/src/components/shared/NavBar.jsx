import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Briefcase, LogOut, User2, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/lib/axios";
import { setUser } from "@/redux/authSlice";

const NavBar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white shadow-sm border-b border-gray-800">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Briefcase className="text-white" />
          <h1 className="text-2xl font-bold text-white">
            Job<span className="text-gray-400">Nest</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-sm font-medium">
            {user && user.role === "admin" ? (
              <>
                <li>
                  <Link
                    to="/admin/company"
                    className="hover:text-gray-300 transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-gray-300 transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-gray-300 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-gray-300 transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-gray-300 transition">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button className="bg-zinc-800 text-white hover:bg-zinc-700 transition shadow-sm">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-black hover:bg-gray-200 transition shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-1 ring-gray-700">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto
                        ? user?.profile?.profilePhoto
                        : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 mr-3 bg-[#111111] border border-gray-800 rounded-xl shadow-md p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="ring-1 ring-gray-700">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto
                          ? user?.profile?.profilePhoto
                          : "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-semibold text-white">
                      {user?.fullName}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  {user && user.role !== "admin" && (
                    <div className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer">
                      <User2 size={18} />
                      <Link to="/profile" className="hover:underline">
                        View Profile
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer">
                    <LogOut size={18} />
                    <Link onClick={logoutHandler} className="hover:underline">
                      Logout
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu + Avatar (Small Screens Only) */}
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <Avatar className="cursor-pointer ring-1 ring-gray-700">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto
                    ? user?.profile?.profilePhoto
                    : "https://github.com/shadcn.png"
                }
                alt="User"
              />
            </Avatar>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <button className="text-white">
                <Menu />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-[#111111] border border-gray-800 rounded-xl shadow-md p-4">
              <ul className="flex flex-col gap-4 text-sm font-medium">
                {user && user.role === "admin" ? (
                  <>
                    <li>
                      <Link to="/admin/company" className="hover:text-white">
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/jobs" className="hover:text-white">
                        Jobs
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" className="hover:text-white">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/jobs" className="hover:text-white">
                        Jobs
                      </Link>
                    </li>
                    <li>
                      <Link to="/browse" className="hover:text-white">
                        Browse
                      </Link>
                    </li>
                  </>
                )}

                {!user ? (
                  <>
                    <li>
                      <Link to="/login" className="hover:text-white">
                        Log In
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="hover:text-white">
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile" className="hover:text-white">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="hover:text-white text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
