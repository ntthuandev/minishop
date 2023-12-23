import History from "../models/history.model.js";

import { createError } from "../utils/error.js";

const createHistory = async (req, res, next) => {
  // body: modelType modelId action user
  const history = new History(req.body);
  try {
    const newHistory = await history.save();
    res.status(200).json({ data: newHistory });
  } catch (error) {
    next(error);
  }
};

const getAllHistory = async (req, res, next) => {
  try {
    const allHistory = await History.find({})
    .sort({
        timestamp: -1,
      })
  .populate('user')  // Populate thông tin của user
  .populate('modelId'); 
    //   .populate({
    //     path: "user",
    //     select: "-password",
    //   })
    //   .populate({
    //     path: "modelId",
       
    //   });
    res.status(200).json({ data: allHistory });
  } catch (error) {
    next(error);
  }
};
export { createHistory, getAllHistory };
