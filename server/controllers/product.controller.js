import Product from "../models/product.model.js";
import { createError } from "../utils/error.js";


const createProduct = async (req, res, next) => {
  req.body.user = req.user.id;
  const newProduct = new Product(req.body);
  try {
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );
    if (!updateProduct)
      return next(createError(404, `No product with id:  ${productId}`));
    res.status(200).json(updateProduct);
  } catch (error) {
    next();
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    next();
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({data: allProducts});
  } catch (error) {
    next(error);
  }
};

// get san pham co so luong ban nhieu nhat
const getMaxInventoryProducts = async (req, res, next) => {
  try {
     const data = await Product.find({}).sort({
      "sales": -1
     }).limit(5);
   
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

const getPanigation = async(req, res , next) => {
  try {
    const {page, limit} = req.query;
    const skipProduct = Math.abs(page -1)*limit;
    const data = await Product.find({}).sort({createdAt: -1}).skip(skipProduct).limit(limit);
    const totalProduct = await Product.find({}).count()
    res.status(200).json({"totalProduct": totalProduct, "products": data})
  } catch (error) {
     next(error);
  }
}

const getSearchProduct = async (req, res, next) => {
  try {
    const {searchProduct } = req.query;

    const regex = new RegExp(searchProduct, "i")
    const product =( await Product.find({})).filter(item =>  regex.test(item._id) || regex.test(item.category) || regex.test(item.name) )
    
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}
export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getMaxInventoryProducts,
  getSearchProduct,
  getPanigation
};
