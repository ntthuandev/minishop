

import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (!token) {
    return next(createError(401, "Bạn cần phải đăng nhập!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token không hợp lệ!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    
    if (req?.user?.id  || req?.user?.isAdmin) {
      next();
    } else {
      return next(createError(403, "Bạn không có quyền truy cập"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      return next(createError(403, "Bạn không có quyền admin!"));
    }
  });
};