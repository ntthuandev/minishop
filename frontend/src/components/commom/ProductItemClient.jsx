import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
const ProductItemClient = ({ data }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  
  const quantity = getItemQuantity(data._id);

  return (
    <div className="h-full bg-white p-4 border rounded-lg">
      <img
        src={data.image}
        alt={data.name}
        className="object-cover h-24 w-full"
      />
      <div className="flex flex-col mt-4">
        <div className="flex justify-between flex-col mb-4">
          <span className="text-2xl whitespace-nowrap overflow-hidden">
            {data.name}
          </span>
          <span className="ms-2 text-gray-500">
            {formatCurrency(data.price)}
          </span>
        </div>
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-90"
              onClick={() => increaseCartQuantity(data._id, data.image,data. price, data.name)}
            >
              + Thêm vào giỏ hàng
            </button>
          ) : (
            <div className="flex  flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  onClick={() => decreaseCartQuantity(data._id)}
                >
                  -
                </button>
                <div>
                  <span className="text-xl">{quantity}</span> trong giỏ hàng
                </div>
                <button
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  onClick={() => increaseCartQuantity(data._id)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(data._id)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItemClient;
