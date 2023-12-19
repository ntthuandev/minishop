import React from 'react'

const ContactForm = () => {
  return (
    <div className="mb-30">
  {/* CONTACT INFO */}
  <div>
    <h2 className="text-xl mb-4">Thông tin đặt hàng</h2>
    <input
      className="w-full p-2 border rounded mb-4"
      type="text"
      placeholder="Email"
     
      // onChange={handleChange}
     
      name="email"
      // Assuming errors.email is a string message
      // className={`${
      //   touched.email && errors.email ? 'border-red-500' : 'border'
      // } w-full p-2 rounded`}
    />
    {/* {touched.email && errors.email && (
      <p className="text-red-500 mb-4">email</p>
    )} */}
    <input
      className="w-full p-2 border rounded"
      type="text"
      placeholder="Phone Number"
      
      // onChange={handleChange}
      // value={values.phoneNumber}
      name="phoneNumber"
      // Assuming errors.phoneNumber is a string message
      // className={`${
      //   touched.phoneNumber && errors.phoneNumber
      //     ? 'border-red-500'
      //     : 'border'
      // } w-full p-2 rounded`}
    />
    {/* {touched.phoneNumber && errors.phoneNumber && (
      <p className="text-red-500">{errors.phoneNumber}</p>
    )} */}
  </div>
</div>

  )
    
}

export default ContactForm