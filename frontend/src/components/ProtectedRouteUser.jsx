import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ProtectedRouteUser = ({children}) => {
    const navigate = useNavigate()
  const {user} = useSelector(store => store.auth)

  useEffect(() => {
    if(user == null || user?.role !== 'user') {
        
        navigate("/")
        
    }
  }, [])

  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRouteUser