const dataOrder = [
  // thaotrang
  {
    shippingFee: 0,
    orderItems: [
      {
        amount: 2,
        product: "6546451c3a7fef39c2e3eb0f",
      },
      {
        amount: 1,
        product: "6546452e3a7fef39c2e3eb11",
      },
      {
        amount: 1,
        product: "654645813a7fef39c2e3eb1f",
      },
    ],
    status: "Đã Thanh Toán'",
    phoneOrder: "0234893456",
    userId: "657f24f36f7b16b2711a60a8",
  },

  // truonggiang 657f24e86f7b16b2711a60a5
  {
    shippingFee: 1000000,
    orderItems: [
      {
        amount: 1,
        product: "6546452e3a7fef39c2e3eb11",
      },
      {
        amount: 1,
        product: "654645ae3a7fef39c2e3eb29",
      },
    ],
    status: "Chưa Thanh Toán",
    phoneOrder: "0234893456",
    userId: "657f24e86f7b16b2711a60a5"
  },

  {
    "shippingFee": 1000000,
    "orderItems": [
      {
        "amount": 1,
        "product": "654645a43a7fef39c2e3eb27",
      },
      {
        "amount": 1,
        "product": "654645c23a7fef39c2e3eb2d",
      },
      {
        "amount": 1,
        "product": "654645f03a7fef39c2e3eb35",
      },
    ],
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0234893456",
    "userId": "657f24e86f7b16b2711a60a5"
  },

  // dinhthao
  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 3,
        "product": "654645f03a7fef39c2e3eb35",
      },
      {
        "amount": 1,
        "product": "654646123a7fef39c2e3eb3b",
      },
      {
        "amount": 1,
        "product": "6546456e3a7fef39c2e3eb1b",
      },
    ],
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0334693499",
    "userId": "657f24de6f7b16b2711a60a2"
  },

  //ha anh
  {
    "shippingFee": 2000000,
    "orderItems": [
      {
        "amount": 2,
        "product": "654645773a7fef39c2e3eb1d",
      },
      {
        "amount": 1,
        "product": "654645933a7fef39c2e3eb23",
      },
    ],
    "addressOrder": "Hoàng Mai, Hà Nội",
    "status": "Đã Thanh Toán",
    "phoneOrder": "0324596489",
    "userId": "657f24d26f7b16b2711a609f"
  },

  // ngocphuc
  {
    "shippingFee": 1000000,
    "orderItems": [
      {
        "amount": 2,
        "product": "654645a43a7fef39c2e3eb27",
      },
    ],
    "addressOrder": "Xuân Phương, Nam Từ Liêm, Hà Nội",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0434596488",
    "userId": "657f24c46f7b16b2711a609c"
  },

  // truongthuy 657f24b56f7b16b2711a6099
  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 1,
        "product": "654645b83a7fef39c2e3eb2b",
      },
      {
        "amount": 1,
        "product": "654645d73a7fef39c2e3eb31",
      },
      {
        "amount": 1,
        "product": "654645fd3a7fef39c2e3eb37",
      },
    ],
    "addressOrder": "Xuân Phương, Nam Từ Liêm, Hà Nội",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0434596488",
    "userId": " 657f24b56f7b16b2711a6099"
  },

  // truongthuy
  {
    "shippingFee": 50000,
    "orderItems": [
      {
        "amount": 2,
        "product": "654646093a7fef39c2e3eb39",
      },
    ],
    "addressOrder": "Tu Hoàng, Nam Từ Liêm, Hà Nội",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0434566478",
    "userId": " 657f24b56f7b16b2711a6099"
  },

  // dangnhan 657f24a86f7b16b2711a6096
  {
    "shippingFee": 100000,
    "orderItems": [
      {
        "amount": 1,
        "product": "654646123a7fef39c2e3eb3b",
      },
      {
        "amount": 1,
        "product": "654645c23a7fef39c2e3eb2d",
      },
    ],
    "addressOrder": "Phú Thọ",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0234566479",
    "userId": " 657f24a86f7b16b2711a6096"
  },

  // hongngoc 657f249a6f7b16b2711a6093
  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 3,
        "product": "654645fd3a7fef39c2e3eb37"
      },
      {
        "amount": 1,
        "product": "6546452e3a7fef39c2e3eb11"
      },
      {
        "amount": 2,
        "product": "654645623a7fef39c2e3eb19"
      }
    ],
    "addressOrder": "Hà Tĩnh",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0434566470",
    "userId": "657f249a6f7b16b2711a6093"
  },

  // duong van thanh
  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 1,
        "product": "654645773a7fef39c2e3eb1d",
      },
      {
        "amount": 1,
        "product": "654645813a7fef39c2e3eb1f",
      },
    ],
    "addressOrder": "Vĩnh Phúc",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0234567475",
    "userId": "657f24866f7b16b2711a6090"
  },

  // phanhue
  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 1,
        "product": "654645933a7fef39c2e3eb23",
      },
      {
        "amount": 2,
        "product": "654645813a7fef39c2e3eb1f",
      },
      {
        "amount": 2,
        "product": "6546459c3a7fef39c2e3eb25",
      },
    ],
    "addressOrder": "Vĩnh Phúc",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0234567475",
    "userId": "654645813a7fef39c2e3eb1f"
  },

  //haidongphan
  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 2,
        "product": "654645933a7fef39c2e3eb23",
      },
      {
        "amount": 1,
        "product": "654645b83a7fef39c2e3eb2b",
      },
      {
        "amount": 2,
        "product": "654645a43a7fef39c2e3eb27",
      },
    ],
    "addressOrder": "Hải Hậu, Nam Định",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0224565575",
    "userId": "657f24166f7b16b2711a6088"
  },

  // namnuyen

  {
    "shippingFee": 0,
    "orderItems": [
      {
        "amount": 1,
        "product": "654645813a7fef39c2e3eb1f",
      },
      {
        "amount": 1,
        "product": "654645933a7fef39c2e3eb23",
      },
    ],
    "addressOrder": "Hưng Yên",
    "status": "Chưa Thanh Toán",
    "phoneOrder": "0444565575",
    "userId": "657f23ea399a2e95fe31dd2f"
  },
];
