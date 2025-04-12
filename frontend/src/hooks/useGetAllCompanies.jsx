import { COMPANY_API_END_POINT } from '@/lib/axios'
import { setCompanies, setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanies = async () => {
          try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
              withCredentials: true,
            });
            if (res.data.success) {
              dispatch(setCompanies(res.data.companies));
            }
          } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
          }
        };
      
        fetchCompanies(); 
      }, []);
      
}

export default useGetAllCompanies