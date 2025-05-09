import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  useGetAllJobs()
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role === "admin") {
navigate("/admin/company")
    }
  },[])
  return (
    <div className='bg-[#0a0a0a]'>
        <NavBar/>

        <HeroSection/>

        <CategoryCarousel/>

        <LatestJob/>

       <Footer/>
    </div>
  )
}

export default Home