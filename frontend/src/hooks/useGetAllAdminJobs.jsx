import { JOB_API_END_POINT } from '@/lib/axios'
import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
 useEffect(() => {
    const fetchAllAdminJobs = async() => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get-admin-jobs`, {
                withCredentials:true,
            })

            if(res.data.success) {
                dispatch(setAllAdminJobs(res.data.job))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    fetchAllAdminJobs()
 },[])
}

export default useGetAllAdminJobs