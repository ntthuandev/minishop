import React from "react";
import { formatNumber } from "../../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import { Button } from "../../components";
import useFetch from "../../hooks/useFetch";
// const product = {
//   name: "accent chair",
//   price: 25999,
//   image:
//     "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
//   company: "marcos",
//   description:
//     "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
//   category: "office",
//   inventory: 15,
//   sales: 20,
// };
{
}
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`/api/products/${id}`);

  const handleUpdateProduct = () => navigate(`/products/update/${id}`);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <div>
          {product ? (
      <>
        <div className="flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24">
          <div className="flex gap-28 xl:flex-row flex-col">
            <div className=" xl:max-w-[50%] max-w-full border border-[#CDDBFF] rounded-[17px]">
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto h-[300px] w-[400px]"
              />
            </div>
    
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                <div className="flex flex-col gap-3">
                  <p className="text-[28px] text-secondary font-semibold">
                    {product.name}
                  </p>
                  <p>
                    Mã sản phẩm: <span className="ml-5"> {product._id}</span>
                  </p>
                  <p>
                    Loại sản phẩm: <span className="ml-5"> {product.category}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10">
                      <p className="text-base font-semibold text-[#D46F77]">
                        Đã bán: {product.sales}
                      </p>
                      <p className="text-base font-semibold text-[#D46F77]">
                        Số lượng còn: {product.inventory}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]">
                <div className="flex flex-col gap-2">
                  <p className="text-[34px] text-secondary font-bold">
                    {formatNumber(product.price)} Vnd
                  </p>
                  <p className="text-[21px] text-black opacity-50 line-through">
                    {product.currency} {formatNumber(product.price)} Vnd
                  </p>
                </div>
    
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]">
                      <AiTwotoneStar />
                      <p className="text-sm text-primary-orange font-semibold">
                        {product.stars || "25"}
                      </p>
                    </div>
                  </div>
    
                  <p className="text-sm text-black opacity-50">
                    <span className="text-primary-green font-semibold">93% </span>{" "}
                    of buyers have recommeded this.
                  </p>
                </div>
              </div>
    
              <div className="my-7 flex flex-col gap-5">
                <div className="flex gap-5 flex-wrap">
                  <div
                    className={`flex-1 min-w-[200px] flex flex-col gap-2 border-l-[3px] rounded-10 bg-white-100 px-5 py-4`}
                  >
                    <p className="text-base text-black-100">Số lượng đã bán: </p>
    
                    <p className="text-2xl font-bold text-secondary">
                      {product.sales}
                    </p>
                  </div>
                  <div
                    className={`flex-1 min-w-[200px] flex flex-col gap-2 border-l-[3px] rounded-10 bg-white-100 px-5 py-4`}
                  >
                    <p className="text-base text-black-100">Số lượng còn: </p>
    
                    <p className="text-2xl font-bold text-secondary">
                      {product.inventory}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl text-secondary font-semibold">
                Thông Tin Mô Tả
              </h3>
    
              <div className="flex flex-col gap-4">
                {product?.description?.split("\n")}
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                title="Cập Nhật Thông Tin Sẩn Phẩm"
                width="w-2/5"
                handleClick={handleUpdateProduct}
              />
            </div>
          </div>
        </div>
      
      </>

    ) : (
      <p className="text-xl text-center text-red-700 font-bold">Sản phẩm đã bị xoá hoặc không tồn tại</p>
    )}
    </div>
    
  )
   
  
};

export default ProductDetail;
