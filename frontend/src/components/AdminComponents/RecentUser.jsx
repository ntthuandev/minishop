import React, { useEffect, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../config/Url'


export const RecentUser = () => {
    const [recentUser, setRecentUser] = useState([])

    const {data:user, loading, error} = useFetch(`${API_URL}/users?limit=3`)

    const navigate = useNavigate()
    const handleViewUsers = () => {
        navigate("/admin/users")
    }
    useEffect(() => {
        if(loading) return
        setRecentUser(user?.data)
    }, [loading])
  return (
    <div className='relative flex-1 flex flex-col gap-5 mt-5 rounded-xl shadow-lg p-10'>
        <p className='text-xl font-semibold'>Khách hàng mới</p>
        
       {recentUser?.map(item => (
        <div key={item._id} className=' relative flex gap-10 px-3 py-2 items-center border rounded-lg'>
            <span className='absolute top-[-20%] right-0 bg-red-400 text-white text-sm border rounded-full font-semibold p-3'>Mới</span>
            <img src={item?.photo} className='w-16 h-16 rounded-full object-cover'/>
            <div>
                <p>{item?.fullname}</p>
                <span>{item?.username}</span>
                </div>
        </div>
       ))}

       <button className='bg-blue-500 text-white px-5 py-2 rounded-xl hover:opacity-90' onClick={handleViewUsers}>Danh sách khách hàng</button>
    </div>
  )
}
