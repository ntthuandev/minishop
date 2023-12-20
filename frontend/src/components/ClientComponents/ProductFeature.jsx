import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const data = [
  {
    image: "https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22.jpg",
    name: "Không gian phòng ăn",
    catogory: "Mẫu phòng ăn",
    description: "Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt",
  },
  {
    image: "https://nhaxinh.com/wp-content/uploads/2023/05/mau-phong-ngu-16-5-23.jpg",
    name: "Không gian phòng ngủ",
    catogory: "Mẫu phòng ngủ",
    description: "Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần gũi và thoải mái",
  },
  {
    image: "https://nhaxinh.com/wp-content/uploads/2023/05/mau-phong-khach-nha-xinh-24523.jpg",
    name: "Không gian phòng khách",
    catogory: "Mẫu phòng khách",
    description: "Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình",
  }
]

const ProductFeature = () => {
  const navigate = useNavigate();
const handleNavigate = () => {
  navigate("/products")
}
  return (
    <section className='mx-10 p-5 mb-10'>
        <h2 className='text-2xl font-bold'>Sản Phẩm Nổi Bậc</h2>
        <div className='flex justify-between mt-5 gap-10'>
          {data.map(item => (
            <div key={item.name}>
              <img src={item?.image} alt="product_image" className='w-full h-[200px] object-cover' />
              <div className='mt-3 flex-1'>
                <p className='text-xl font-semibold'>{item.name}</p>
                <span className='text-sm whitespace-normal'>{item.description}</span>
                <div className='flex gap-5 items-center mt-3 ml-3'>
                  <button className=' text-gray-700 font-bold' onClick={handleNavigate}>{item.catogory} <FaArrowRight className='inline'/></button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default ProductFeature