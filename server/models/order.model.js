import mongoose from "mongoose";

const SingleOrderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  });

  const OrderSchema = mongoose.Schema(
    {
      shippingFee: {
        type: Number,
        required: true,
        default: 0
      },
      addressOrder: {
        type: String,
      },
      phoneOrder: {
        type: String
      },
      subtotal: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      totalProduct: {
        type: Number,
        required: true,
        default: 0
      },
      orderItems: [SingleOrderItemSchema],
      status: {
        type: String,
        enum: [ 'Đã Thanh Toán', "Chưa Thanh Toán"],
        default: 'Chưa Thanh Toán',
      },
      isCheck: {
        type: Boolean,
        default: false
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      }, 
    },
    { timestamps: true }
  );

export default mongoose.model("Order", OrderSchema);