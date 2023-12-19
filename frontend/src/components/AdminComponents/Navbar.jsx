import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const {user} = useContext(AuthContext) 
  return (
    <nav className='flex justify-end border-b px-5 py-6  z-20'>
        
        <div className='flex gap-5 mr-10'>
            <span>{user.details.fullname}</span>
            <img  src={user.details.photo} alt='photo' className='w-7 h-7 object-cover rounded-full'/>
        </div>
    </nav>
  )
}

export default Navbar