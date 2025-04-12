import { COMPANY_API_END_POINT } from '@/lib/axios'
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
 useEffect(() => {
    const fetchSingleCompany = async() => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/${companyId}`, {
                withCredentials:true,
            })

            if(res.data.success) {
                dispatch(setSingleCompany(res.data.company))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    fetchSingleCompany()
 },[companyId, dispatch])
}

export default useGetCompanyById