import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import Order from "../models/order.model.js"
import History from "../models/history.model.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists)
      return next(createError(401, "Tài khoản này đã tồn tại"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    const history = new History({
      modelType: "User",
      modelId: newUser._id,
      action: "create",
      user: req.user.id
    })
    await history.save();
    res.status(200).json("Thêm người dùng thành công");
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
}



const deleteUser = async(req, res, next) => {
   try {
    const user = await User.findById(req.params.id)
    user.isDelete = true;
    await user.save();
  //  const orderList = await Order.deleteMany({"user": req.params.id})
    const updateResult = await Order.updateMany(
      {"user": req.params.id},
      {$set: {"isDelete": true}}
    );
     // create history
     const history = new History({
      modelType: "User",
      modelId: user._id,
      action: "delete",
      user: req.user.id
    })
    await history.save();

    res.status(200).json("Xoá người dùng thành công")
   } catch (error) {
    next(error);
   }
}

// restore user
const restoreUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    user.isDelete = false;
    const history = await History.findByIdAndUpdate(req.body.idHistory, {$set: {"isRestore": true}})
    await user.save();
  //  const orderList = await Order.deleteMany({"user": req.params.id})
    const updateResult = await Order.updateMany(
      {"user": req.params.id},
      {$set: {"isDelete": false}}
    );
     // create history
     const newHistory = new History({
      modelType: "User",
      modelId: user._id,
      action: "restore",
      user: req.user.id
    })
    await newHistory.save();

    res.status(200).json("Khôi phục người dùng thành công")
   } catch (error) {
    next(error);
   }
}


// const updateResult = await User.updateMany(
//   { isDelete: { $exists: false } }, // Lọc những tài liệu không có isDelete
//   { $set: { isDelete: false } }     // Đặt giá trị mặc định cho isDelete
// );

//6523762b563e9f300165585d
const getAllUsers = async(req, res, next) => {
    const {limit = 0, page = 1} = req.query;
    const skipUser = (page-1)*limit;
   
    try {
      
        const totalUsers = await User.find({isDelete: false}).count();
        const users = await User.find({isAdmin: false, isDelete: false}).select("-password").sort({
            updatedAt: -1
        }
            ).skip(skipUser).limit(limit)
        res.status(200).json({"totalUser" : totalUsers, data: users})
    } catch (error) {
        next(error);
    }
}


const searchUser = async (req, res, next) => {
    try {
        const {searchText} =  req.query;
        
        const regex = new RegExp(searchText, "i");
        
        const userSearch = (await User.find({isDelete: false})).filter((user) =>  regex.test(user._id) || regex.test(user.username) || regex.test(user.phone) || regex.test(user.fullname) )

        res.status(200).json(userSearch)
    } catch (error) {
        next(error)
    }
}

const getUserStats  = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const currentYear = new Date()
    .toLocaleString("en-US", { timeZone: "UTC" })
    .split(",")[0]
    .split("/")[2];

    try {
      const data = await User.aggregate([
        { $match: { createdAt: {
          $gte: new Date(currentYear, 0, 1), // Start of the current year
          $lt: new Date(currentYear + 1, 0, 1),
        }, } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
        {
          $sort: { '_id': 1 }
        }
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
}
export {getAllUsers, getUserById,  deleteUser, searchUser, getUserStats, restoreUser}