
import User from "../models/user.model.js"
import Order from "../models/order.model.js"
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
    await User.findByIdAndDelete(req.params.id)

    await Order.deleteMany({"user": req.params.id})
    res.status(200).json("Xoá người dùng thành công")
   } catch (error) {
    next(error);
   }
}

//6523762b563e9f300165585d
const getAllUsers = async(req, res, next) => {
    const {limit = 0, page = 1} = req.query;
    const skipUser = (page-1)*limit;
    try {
        const totalUsers = await User.find({}).count();
        const users = await User.find({isAdmin: false}).select("-password").sort({
            createdAt: -1
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
        
        const userSearch = (await User.find({})).filter((user) =>  regex.test(user._id) || regex.test(user.username) || regex.test(user.phone) || regex.test(user.fullname) )

        res.status(200).json(userSearch)
    } catch (error) {
        next(error)
    }
}

const getUserStats  = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
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
export {getAllUsers, getUserById,  deleteUser, searchUser, getUserStats}