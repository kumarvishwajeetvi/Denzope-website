import mongoose from "mongoose";
const Investment = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true },
    userId: String,
    amount: Number,
    status: { type: String, enum: ["CREATED", "COMPLETED", "FAILED"] },
  },
  { timestamps: true },
);
export default mongoose.model("Investment", Investment);
