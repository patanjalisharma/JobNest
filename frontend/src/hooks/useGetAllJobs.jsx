import { JOB_API_END_POINT } from '@/lib/axios';
import { setAllJobs, setSearchQuery } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(setSearchQuery(""));
    }, [dispatch]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setIsLoading(true);
                const params = searchQuery?.trim() ? { keyword: searchQuery.trim() } : {};
                
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {
                    params,
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
                toast.error(error.response?.data?.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllJobs();
    }, [searchQuery, dispatch]);

    return { isLoading };
};

export default useGetAllJobs;