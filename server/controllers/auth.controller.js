import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const {username, password} = req.body
    const usernameAlreadyExists = await User.findOne({username})
    if(usernameAlreadyExists) return next(createError(401, "Tài khoản này đã tồn tại"))
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("Tạo tài khoản thành công");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Không tìm thấy người dùng!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Tên đăng nhập hoặc mật khẩu chưa chính xác!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,{expiresIn: "30d"}
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
    .cookie("access_token", token, { domain: '.vercel.app', httpOnly: true, secure: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res) => {
  res.cookie('access_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: 'Tài khoản đã đăng xuất!' });
};

// {
//   httpOnly: true,
// secure:true,
//   sameSite: "strict",
//   maxAge: 60 * 1000,
// }