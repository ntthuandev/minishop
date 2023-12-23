
import mongoose from "mongoose"
const Schema = mongoose.Schema;

const historySchema = new Schema({
  modelType: { type: String, enum: ['User', 'Product', 'Order'], required: true },
  modelId: { type: mongoose.Types.ObjectId, refPath: "modelType", required: true }, // id của user || product || order
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { 
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isRestore: {
    type: Boolean,
    default: false
  }
  // Các trường thông tin khác về lịch sử
});

const History = mongoose.model('History', historySchema);

export default History;
