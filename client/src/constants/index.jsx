import React from 'react';
import {  AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag, FiEdit } from 'react-icons/fi'
import { LiaProductHunt} from "react-icons/lia"
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';

export const links = [
 
  {
    title: 'Trang',
    links: [
      {
        path: "/orders",
        name: 'Đơn hàng',
        icon: <AiOutlineShoppingCart />,
      },
      {
        path: "/products",
        name: 'Sản Phẩm',
        icon: <LiaProductHunt />,
      },
      {path: "/users",
        name: 'Khách Hàng',
        icon: <RiContactsLine />,
      },
    ],
  },
];

