import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products")
  }
  return (
    <section className='flex justify-center mx-14 mt-10  p-5'>
        <div className='w-1/2 py-20'>
            <h2 className='text-3xl font-bold  mb-5'>THIẾT KẾ NỘI THẤT</h2>
            <p className='whitespace-wrap text-lg'>Với kinh nghiệm hơn 23 năm trong lĩnh vực thiết kế và hoàn thiện nội thất cùng đội ngũ thiết kế chuyên nghiệp, Nhà Xinh mang đến giải pháp toàn diện trong nội thất.</p>

            <button onClick={handleClick} className='px-5 py-4 rounded-lg bg-blue-500 text-white mt-5 hover:opacity-90'>Tất cả sản phẩm</button>
        </div>
        <div className='w-1/2 rounded-lg'>
            <img src='https://nhaxinh.com/wp-content/uploads/2023/05/nha-xinh-thiet-ke-noi-that-ecopark-16523-1200x800.jpg' alt="bg-hero" className='w-ful h-ful rounded-lg object-cover'/>
        </div>
    </section>
  )
}

export default Hero