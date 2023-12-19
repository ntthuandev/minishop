import React from 'react'
import useFetch from '../hooks/useFetch'
import Button from './Button'
import { useNavigate, Link } from 'react-router-dom'
const TopProduct = () => {
    const navigate = useNavigate();
    const {data, loading, error} = useFetch("/api/products/top/sales")
    if(loading) return (<p>Loading</p>)
    if(error) return (<p>Something went wrong</p>)
    const handleClick = () => {
        navigate("/products")
    }
  return (
    <div className='flex flex-col gap-5 bg-white p-2'>
        {data.map(item => (
            <div key={item._id} className='flex items-center gap-5 border-1 rounded-lg p-3'>
                <Link to={`/products/${item._id}`}>
                    <img src={item.image} alt='product' className='w-[100px] h-[100px] rounded-xl' />   
                </Link>

                <div className='flex flex-col gap-3 ml-5'>
                    <p>{item.name}</p>
                    <p className='text-rose-700 font-semibold'>Số lượng bán: {item.sales}</p>
                </div>
                
            </div>
        ))}

        <div>
            <Button title="Danh sách sản phẩm" handleClick={handleClick}/>
        </div>
    </div>
  )
}

export default TopProduct