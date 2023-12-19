import { formatCurrency } from "../../utils/formatCurrency";
import { CartItem } from "./CartItem";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import useFetch from "../../hook/useFetch";
import { useNavigate } from "react-router-dom";
export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart();
  const { data } = useFetch("/products");
  const storeItems = data?.data

  const navigate = useNavigate();
  const handleOrder = () => {
    closeCart()
    navigate("/orders/contact")
  
  }
  return (
    <div className={`fixed inset-0 z-50  ${isOpen ? "block" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeCart}
      ></div>
      <div className="fixed inset-y-0 right-0 max-w-full w-1/3 overflow-hidden bg-white shadow-lg">
        <div className="p-4 border-b">
          <h5 className="text-lg font-semibold">Giỏ hàng</h5>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={closeCart}
          >
            <span className="sr-only">Đóng</span>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="mt-4 text-right font-semibold text-lg">
            Tổng cộng: {" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems?.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>

          <div className="flex justify-center gap-10 mt-5 border-t pt-5">
            <button className="px-8 py-2 bg-green-500 rounded-lg text-white hover:opacity-90" onClick={handleOrder}>Đặt hàng</button>
            <button className="px-8 py-2 border border-green-500 rounded-lg">Thanh Toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}
