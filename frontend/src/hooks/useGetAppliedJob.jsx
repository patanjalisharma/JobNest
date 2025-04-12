import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/lib/axios'
import { setAppliedJobs } from '@/redux/jobSlice'

const useGetAppliedJob = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true})
            if(res.data.success) {
                dispatch(setAppliedJobs(res.data.application))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAppliedJobs()
  },[])
}

export default useGetAppliedJob