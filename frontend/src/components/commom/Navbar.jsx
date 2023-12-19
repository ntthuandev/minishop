import React, { useContext } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useShoppingCart } from '../../context/ShoppingCartContext';
const Navbar = () => {
    const {user, dispatch} = useContext(AuthContext)
    const {openCart, cartQuantity} = useShoppingCart()
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        navigate("/login")
    }
  return (
    <nav className='flex justify-between bg-[#f0f6ff] items-center h-16 shadow-lg px-10'>
        <div>
            <Link to="/">
                <h2 className="text-2xl text-blue-500 font-bold">Minishop</h2>
            </Link>
        </div>

        <div className='flex items-center gap-10'>
            
            {cartQuantity > 0 && (
  <button
    onClick={openCart}
    className="bg-white border border-primary rounded-full p-3 relative"
    style={{ width: "3rem", height: "3rem" }}
  >
    <IoCartOutline className='h-7 w-7'  />

    <div
      className=" text-xl rounded-full flex justify-center items-center text-blue-500 font-semibold"
      style={{
        width: "1.5rem",
        height: "1.5rem",
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: "translate(25%, 25%)",
      }}
    >
      {cartQuantity}
    </div>
  </button>
)}


            {!user && (
                <div className='flex gap-5'>
                    <button className='text-lg bg-red-500 px-10 text-white py-2 rounded-lg hover:opacity-90' >Login</button>
                    <button className='text-lg border border-red-500 px-10 py-2 rounded-lg hover:opacity-90 hover:bg-gray-100'>Register</button>
                </div>
            )}

            {user && (
                <div className='flex gap-10'> 
                    <div className='flex items-center gap-3'>
                        <span className='text-lg font-semibold'>{user.details.fullname}</span>
                        <img src={user.details.photo} className='w-[40px] h-[40px] object-cover rounded-full' />
                    </div>

                    <button className='text-lg bg-red-500 px-10 text-white py-2 rounded-lg hover:opacity-90' onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar