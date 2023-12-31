import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { createError } from "../utils/error.js";
import excelJS from "exceljs";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import History from "../models/history.model.js";

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
    // const update = await Order.updateMany({$set: {isCheck: false}})
    const orders = await Order.find({ isDelete: false })
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
    const orders = await Order.find({
      user: req.params.userId,
      isDelete: false,
    });
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
    order.status = "Đã Thanh Toán";
    order.isCheck = true;
    await order.save();

    const history = new History({
      modelType: "Order",
      modelId: order._id,
      action: "CheckOrder",
      user: req.user.id,
    });
    await history.save();
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    const orderDelete = await Order.findByIdAndUpdate(req.params.id, {
      $set: { isDelete: true },
    });
    try {
      try {
        await User.findByIdAndUpdate(order.user._id, {
          $pull: { orderId: orderId },
        });
      } catch (error) {
        next(error);
      }
      const history = new History({
        modelType: "Order",
        modelId: orderDelete._id,
        action: "delete",
        user: req.user.id,
      });
      await history.save();
    } catch (error) {}
    // da xoa don hang thi khong the khoi phuc duoc
    res.status(200).json("Đơn hàng đã xoá thành công");
  } catch (error) {
    next();
  }
};

// restore order
const reStoreOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    const orderRestore = await Order.findByIdAndUpdate(req.params.id, {
      $set: { isDelete: false },
    });
    const history = await History.findByIdAndUpdate(req.body.idHistory, {
      $set: { isRestore: true },
    });
    try {
      try {
        await User.findByIdAndUpdate(order.user._id, {
          $push: { orderId: orderId },
        });
      } catch (error) {
        next(error);
      }
      const newHistory = new History({
        modelType: "Order",
        modelId: orderRestore._id,
        action: "restore",
        user: req.user.id,
      });
      await newHistory.save();
    } catch (error) {}
    // da xoa don hang thi khong the khoi phuc duoc
    res.status(200).json("Đơn hàng được khôi phục");
  } catch (error) {
    next();
  }
};

// get nhung don hang gon day
const getRecentOrders = async (req, res, next) => {
  try {
    const data = await Order.find({ isDelete: false })
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
    const workbook = new excelJS.Workbook();
    const tmpDirectory = "/tmp";
    const filesDirectoryPath = path.join(tmpDirectory, "files"); // create new workbook
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
    const orderList = await Order.find({ isDelete: false }).populate({
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
      // const data = await workbook.xlsx.writeFile(`${filesDirectoryPath}/donhang.xlsx`);
      // res.download(`${filesDirectoryPath}/donhang.xlsx`);

      // const buffer = await workbook.xlsx.writeBuffer();
      // res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      // res.setHeader("Content-Disposition", "attachment; filename=donhang.xlsx");
      // res.send(buffer);

      const filePath = path.join(filesDirectoryPath, "donhang.xlsx");
      await workbook.xlsx.writeFile(filePath);
      res.download(filePath);
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
    const tmpDirectory = "/tmp";
    const filesDirectoryPath = path.join(tmpDirectory, "files"); // create new workbook
    if (!fs.existsSync(filesDirectoryPath)) {
      fs.mkdirSync(filesDirectoryPath, { recursive: true });
    } // path to download excel

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

    // const detail = await workbook.xlsx.writeFile(
    //   `${pathFile}/chitiet_donhang.xlsx`
    // );
    // res.download("./files/chitiet_donhang.xlsx");

    const filePath = path.join(filesDirectoryPath, "chitiet_donhang.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath);
  } catch (error) {
    next(error);
  }
};

const getMonthlyIncome = async (req, res, next) => {
  // const date = new Date();
  // const twoMonthsAgo = new Date(new Date().setMonth(date.getMonth() - 2));
  // const currentYear = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
  // console.log(currentYear)

  const date = new Date();
  const currentYear = date.getUTCFullYear();

  // Calculate two months ago
  const twoMonthsAgo = new Date(date);
  twoMonthsAgo.setUTCMonth(date.getUTCMonth() - 1);


  try {
    const income = await Order.aggregate([
      {
        $match: {
          // createdAt: { $gte: twoMonthsAgo },
          createdAt: { $gte: twoMonthsAgo, $lt: date },
          isDelete: false,
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          total: "$total",
          orderItems: "$orderItems",
          totalProduct: "$totalProduct",
          isCheck: "$isCheck",
        },
      },

      {
        $group: {
          // _id: "$month",
          _id: {
            year: "$year",
            month: "$month",
          },
          totalSale: { $sum: "$totalProduct" },
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$isCheck", true] }, "$total", 0] },
          },
          totalOrder: { $sum: 1 },
        },
      },
      {
        // $sort: { _id: 1 },
        $sort: { year: 1, month: 1 },
        
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
  // const currentYear = date.getUTCFullYear();
  const currentYear = new Date()
    .toLocaleString("en-US", { timeZone: "UTC" })
    .split(",")[0]
    .split("/")[2];


  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1), // Start of the current year
            $lt: new Date(currentYear + 1, 0, 1),
          },
          isDelete: false,
        },
      },
      // { $match: { createdAt: { $gte: lastYear }, isDelete: false } },

      {
        $project: {
          month: { $month: "$createdAt" },
          total: "$total",
          totalProduct: "$totalProduct",
          isCheck: "$isCheck",
        },
      },

      {
        $group: {
          _id: "$month",

          totalSale: { $sum: "$totalProduct" },
          // totalIncome: { $sum: "$total" },
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$isCheck", true] }, "$total", 0] },
          },
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
  reStoreOrder,
};
