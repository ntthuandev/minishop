import React , {useContext, useRef, useState} from "react";
import { useFormik } from "formik";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import useFetch from "../../hook/useFetch";
import { formatCurrency } from "../../utils/formatCurrency";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/Url";
const Checkout = () => {
  const { cartItems } = useShoppingCart();
  //const [dataOrder, setDataOrder] = useState({});
  const navigate = useNavigate()
  const dataOrder = useRef({})
  const {data} = useFetch("/products")
  const storeItems = data?.data
  // get User Session
  const {user} = useContext(AuthContext)
  const validate = (values) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  
    var phone = values.phoneNumber.match(phoneno);
    const errors = {};
    if (!values.phoneNumber) {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    }  else if(!phone)
    { 
      errors.phoneNumber = "Số điện thoại không hợp lệ";
      if (values.phoneNumber.length !== 10) {
        errors.phoneNumber = "Số điện thoại không hợp lệ";
      }
    }


    if (!values.address) {
      errors.address = "Vui lòng nhập địa chỉ";
    }
    return errors;
  };
  

  

  const handleOrder =  (values) => {
    const newCartItems = cartItems.map(i => ({
      product: i.id,
      amount: i.quantity
    }))
    dataOrder.current = {...dataOrder, userId: user.details._id, phoneOrder: values.phoneNumber,addressOrder: values.address, orderItems: newCartItems}

    console.log(dataOrder.current)

      //sendOderData(dataOrder)
      const sendOderData= async () => {
        try {
          const res = await  axios.post(`${API_URL}/orders`, dataOrder.current)
          if(res) {
            alert("Đặt Hàng Thành công")
            setTimeout(() => {
              navigate("/")
            }, 1000)
          }
        } catch (error) {
          alert(error)
        }
      }

      sendOderData()
  }

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      address: "",
    },
    validate,
    onSubmit:  (values) => {
        handleOrder(values)
    },
  });
  return (
    <div className="bg-slate-200 flex flex-col p-10 h-[100vh] m-0">
      <h2 className="text-center text-4xl text-blue-400 font-bold my-10">
        Thông tin đặt hàng
      </h2>
      <div className="flex justify-between gap-10">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-1 flex-col items-center bg-white py-10"
        >
          <div className="px-5 py-3 w-1/2 flex flex-col">
            <label htmlFor="phoneNumber" className="text-lg font-semibold mb-5">
              Số điện thoại nhận hàng
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              className="px-3 py-2 w-full outline-none border focus:border-purple-600 "
            />
            {formik.errors.phoneNumber ? (
              <p className="text-red-500">{formik.errors.phoneNumber}</p>
            ) : null}
          </div>

          <div className="px-5 py-3 w-1/2 flex flex-col">
            <label htmlFor="address" className="text-lg font-semibold mb-5">
              Địa chỉ nhận hàng
            </label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              className="px-3 py-2 w-full outline-none border focus:border-purple-600"
            />
            {formik.errors.address ? (
              <p className="text-red-500">{formik.errors.address}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="px-10 py-3 mt-10 bg-green-500 text-white rounded-lg hover:opacity-90"
          >
            Đặt Hàng
          </button>
        </form>
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg">
          <div className="p-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
