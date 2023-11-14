import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2023/08/15/09/21/camera-8191564_1280.jpg"
    },
  },
  { timestamps: true }
);


export default mongoose.model('User', userSchema);