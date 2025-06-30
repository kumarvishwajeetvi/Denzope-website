import mongoose from "mongoose";
const User = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
});
export default mongoose.model("User", User);
