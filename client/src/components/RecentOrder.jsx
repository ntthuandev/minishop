import React from 'react'
import useFetch from '../hooks/useFetch'
import Button from './Button'
import { useNavigate, Link } from 'react-router-dom'
import { formatNumber } from '../utils'
const RecentOrder = () => {
    const navigate = useNavigate();
    const {data, loading, error} = useFetch("/api/orders/top/resent")
    if(loading) return (<p>Loading</p>)
    if(error) return (<p>Something went wrong</p>)
    const handleClick = () => {
        navigate("/orders")
    }
  return (
    <div className='flex flex-col gap-5 bg-white p-2'>
        {data.map(item => (
            <div key={item._id} className='flex items-center gap-5 border-1 rounded-lg p-3'>
                <Link to={`/orders/${item._id}`}>
                    <img src={item?.user?.photo} alt='user' className='w-[100px] h-[100px] object-cover rounded-xl' />   
                </Link>

                <div className='flex flex-col gap-3 ml-5'>
                    <p>Tên khách hàng: {item?.user?.fullname}</p>
                    <p className='text-rose-700 font-semibold'>Tổng tiền thanh toán: {formatNumber(item.total)} Vnd</p>
                    <p>Tinh trạng đơn hàng: <span className='border-1 px-3 py-2 border-red-300 rounded-lg ml-5'>{item.status}</span></p>
                </div>
                
            </div>
        ))}

        <div>
            <Button title="Danh sách đon hàng" handleClick={handleClick}/>
        </div>
    </div>
  )
}

export default RecentOrder