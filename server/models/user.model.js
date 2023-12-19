import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 32
    },
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    orderId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
   isAdmin: {
    type: Boolean,
    default: false,
   }
}, { timestamps: true });
export default mongoose.model("User", userSchema);