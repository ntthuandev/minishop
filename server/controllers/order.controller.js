import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { createError } from "../utils/error.js";
import excelJS from "exceljs";
import * as fs from "fs";
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems: cartItems,
      shippingFee = 0,
      status,
      addressOrder,
      phoneOrder,
      userId,
    } = req.body;
    //const userId = req.user.id;
    if (!cartItems || cartItems.length < 1) {
      return next(createError(404, "Không có sản phẩm trong đơn hàng"));
    }

    let orderItems = [];
    let subtotal = 0;
    let totalProduct = 0;
    for (const item of cartItems) {
      const dbProduct = await Product.findOne({ _id: item.product });
      if (!dbProduct) {
        return next(
          createError(404, `Không có sản phẩm với mã : ${item.product}`)
        );
      }
      if (item.amount > dbProduct.inventory)
        return next(createError(404, "Số lượng không đủ"));
      else {
        dbProduct.inventory -= item.amount;
        dbProduct.sales += item.amount;
        await dbProduct.save();
      }
      const { name, price, image, _id } = dbProduct;
      const singleOrderItem = {
        amount: item.amount,
        name,
        price,
        image,
        product: _id,
      };
      // add item to order
      orderItems = [...orderItems, singleOrderItem];
      // calculate subtotal
      subtotal += item.amount * price;
      totalProduct += item.amount;
    }
    // calculate total
    const total = shippingFee + subtotal;

    const order = await Order.create({
      orderItems,
      total,
      subtotal,
      totalProduct,
      shippingFee,
      status,
      addressOrder,
      phoneOrder,
      user: userId,
    });
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { orderId: order._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
const getAllOrders = async (req, res, next) => {
  const { limit = 0, page = 0 } = req.query;
  const skipOrder = (page - 1) * limit;
  try {
    const orders = await Order.find({})
      .populate({
        path: "user",
        select: "-password",
      })
      .sort({
        createdAt: -1,
      })
      .skip(skipOrder)
      .limit(limit);

    const quantityOrders = await Order.find({}).count();
    res.status(200).json({ totalOrder: quantityOrders, data: orders });
  } catch (error) {
    next(error);
  }
};
const getSingleOrder = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findOne({ _id: orderId }).populate({
      path: "user",
      select: "-password",
    });
    if (!order) {
      return next(createError(404, `Không có đơn hàng với mã : ${orderId}`));
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
const getCurrentUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    const user = await User.findOne({ _id: req.params.userId });
    //res.status(200).json({ orders, count: orders.length });
    res.status(200).json({ orders, count: orders.length, user: user });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return next(createError(`Không có đơn hàng với mã : ${orderId}`));
    }
    //order.status = "Đã thanh toán";
    order.isCheck = true;
    await order.save();

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    await Order.findByIdAndDelete(req.params.id);
    try {
      try {
        await User.findByIdAndUpdate(order.user._id, {
          $pull: { orderId: orderId },
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {}
    res.status(200).json("Đơn hàng đa xoá thành công");
  } catch (error) {
    next();
  }
};

// get nhung don hang gon day
const getRecentOrders = async (req, res, next) => {
  try {
    const data = await Order.find({})
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .limit(3);

    res.status(200).json({ orderRecent: data });
  } catch (error) {
    next(error);
  }
};

// search order
const searchOrder = async (req, res, next) => {
  try {
    const { searchOrder } = req.query;
    const regex = new RegExp(searchOrder, "i");

    const orderSearch = (
      await Order.find({}).populate({
        path: "user",
        select: "-password",
      })
    ).filter(
      (order) =>
        regex.test(order.user.username) ||
        regex.test(order.user.phone) ||
        regex.test(order._id)
    );

    res.status(200).json(orderSearch);
  } catch (error) {
    next(error);
  }
};

// export excel

const exportOrderExcel = async (req, res, next) => {
  try {
    const workbook = new excelJS.Workbook(); // create new workbook
    const filesDirectoryPath = path.join(__dirname,"../" ,'files');// pathto download excel
    if (!fs.existsSync(filesDirectoryPath)) {
      fs.mkdirSync(filesDirectoryPath, { recursive: true });
    }
    const worksheet = workbook.addWorksheet("Order List");

    worksheet.columns = [
      { header: "STT", key: "s_no", width: 10 },
      { header: "Mã đơn hàng", key: "_id", width: 30 },
      { header: "Tên khách hàng", key: "fullname", width: 20 },
      { header: "Địa chỉ", key: "address", width: 10 },
      { header: "Số điện thoại", key: "phone", width: 10 },
      { header: "Phí Vận chuyển", key: "shippingFee", width: 10 },
      { header: "Tổng tiền", key: "total", width: 20 },
      { header: "Tình trạng đơn hàng", key: "status", width: 20 },
    ];

    let counter = 1;
    const orderList = await Order.find({}).populate({
      path: "user",
      select: "-password",
    });

    orderList.forEach((item) => {
      let order = {};
      order.s_no = counter;
      order._id = item._id;
      order.fullname = item.user.fullname;
      order.address = item.addressOrder;
      order.phone = item.phoneOrder;
      order.shippingFee = item.shippingFee;
      order.total = item.total;
      order.status = item.status;

      worksheet.addRow(order);
      counter++;
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    try {
      const data = await workbook.xlsx.writeFile(`${filesDirectoryPath}/donhang.xlsx`);
      res.download(`${filesDirectoryPath}/donhang.xlsx`);

      // const buffer = await workbook.xlsx.writeBuffer();
      // res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      // res.setHeader("Content-Disposition", "attachment; filename=donhang.xlsx");
      // res.send(buffer);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const downloadOrderDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Order.findById(id).populate({
      path: "user",
      select: "-password",
    });

    const workbook = new excelJS.Workbook(); // create new workbook
    const pathFile = "./files"; // path to download excel

    const worksheet = workbook.addWorksheet("Order Detail");
    let counter = 1;
    let dataProduct = [];

    data.orderItems.forEach((item) => {
      dataProduct.push([counter, item.name, item.amount, item.price]);
      counter++;
    });

    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.addRows([
      ["Mã đơn hàng", data._id],
      ["Tên khách hàng", data.user.fullname],
      ["Địa chỉ", data.addressOrder],
      ["Số điện thoại", data.phoneOrder],
      ["Ngày đặt hàng", data.createdAt],
      ["Phí vận chuyển", data.shippingFee],
      ["Tổng tiền: ", data.total],
      ["Trạng thái đơn hàng", data.status],
      ["Danh sách sản phẩm đặt mua"],

      ["STT", "Tên sản phẩm", "Số lượng", "Giá"],
      ...dataProduct,
    ]);

    const detail = await workbook.xlsx.writeFile(
      `${pathFile}/chitiet_donhang.xlsx`
    );
    res.download("./files/chitiet_donhang.xlsx");
  } catch (error) {
    next(error);
  }
};




const getMonthlyIncome = async (req, res, next) => {
  const date = new Date();
  const twoMonthsAgo = new Date(new Date().setMonth(date.getMonth() - 2));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: twoMonthsAgo },
         
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          total: "$total",
          orderItems: "$orderItems",
          totalProduct: "$totalProduct",
        },
      },

      {
        $group: {
          _id: "$month",
          totalSale: { $sum: "$totalProduct" },
          totalIncome: { $sum: "$total" },
          totalOrder: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrderDataYear = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          total: "$total",
          orderItems: "$orderItems",
          totalProduct: "$totalProduct",
        },
      },

      {
        $group: {
          _id: "$month",
          totalSale: { $sum: "$totalProduct" },
          totalIncome: { $sum: "$total" },

          totalOrder: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getRecentOrders,
  exportOrderExcel,
  searchOrder,
  downloadOrderDetail,
  getMonthlyIncome,
  getOrderDataYear,
};

// const Order = mongoose.model('Order', orderSchema);

// // Sử dụng aggregation để nhóm và tính tổng theo tháng
// Order.aggregate([
//   {
//     $project: {
//       month: { $month: '$createdAt' },
//       year: { $year: '$createdAt' },
//       total: '$total',
//       orderItems: '$orderItems'
//     }
//   },
//   {
//     $unwind: '$orderItems'
//   },
//   {
//     $group: {
//       _id: {
//         year: '$year',
//         month: '$month',
//         product: '$orderItems.product'
//       },
//       totalAmount: { $sum: '$orderItems.amount' },
//       totalRevenue: { $sum: { $multiply: ['$orderItems.amount', '$orderItems.price'] } },
//       totalOrders: { $sum: 1 }
//     }
//   },
//   {
//     $sort: { '_id.year': 1, '_id.month': 1 }
//   }
// ], (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);
//   }

//   // Đóng kết nối MongoDB sau khi hoàn tất
//   mongoose.connection.close();
// });
