
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { AiOutlineDelete } from "react-icons/ai";
import { formatCurrency } from "../../utils/formatCurrency";
import useFetch from "../../hook/useFetch";

// type CartItemProps = {
//   id: number;
//   quantity: number;
// };

export function CartItem({ id, quantity, price, image, name }) {
    const {data} = useFetch("/products")
    const storeItems = data?.data
    
  const { removeFromCart } = useShoppingCart();
  const item = storeItems?.find((i) => i._id === id);

  if (!item) return null;

  return (
    <div className="flex items-center space-x-2 mb-5">
      <img
        src={image}
        alt={name}
        className="w-20 h-12 object-cover"
      />
      <div className="flex-grow">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-lg text-gray-500">
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-base text-gray-500">
          {formatCurrency(price)}
        </div>
      </div>
      <div className="text-lg">{formatCurrency(price * quantity)}</div>
      <button
        className="text-red-500 hover:text-red-700 text-base"
        onClick={() => removeFromCart(item._id)}
      >
        <AiOutlineDelete className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}
