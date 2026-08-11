import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    minlength: 8,
    default : null
  },

    provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  profileImage: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
    maxlength: 200,
  },

}, {
  timestamps:true
});
const User = mongoose.model("user", userSchema);

export default User;