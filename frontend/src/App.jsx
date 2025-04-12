
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/shared/NavBar"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import NewCompany from "./components/admin/NewCompany"
import CompanySetUp from "./components/admin/CompanySetUp"
import AdminJobs from "./components/admin/AdminJobs"
import PostJobs from "./components/admin/PostJobs"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import ProtectedRouteUser from "./components/ProtectedRouteUser"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/profile" element={<ProtectedRouteUser><Profile/></ProtectedRouteUser>}/>
        <Route path="/description/:id" element={<ProtectedRouteUser><JobDescription/></ProtectedRouteUser>}/>
        <Route path="/admin/company" element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
        <Route path="/admin/company/create" element={<ProtectedRoute><NewCompany/></ProtectedRoute>}/>
        <Route path="/admin/company/:id" element={<ProtectedRoute><CompanySetUp/></ProtectedRoute>}/>
        <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
        <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJobs/></ProtectedRoute>}/>
        <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
