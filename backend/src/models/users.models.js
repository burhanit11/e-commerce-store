import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      index: true,
    },
    // avatar: {
    //   type: String,
    // },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be atleast 4 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// bcrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
});

// compare password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// genrate token
userSchema.methods.genrateToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
};

export const User = mongoose.model("User", userSchema);
