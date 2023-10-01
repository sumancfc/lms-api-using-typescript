import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  user_image: string;
  role: string[];
  resetPassword: {
    data: string;
  };
  is_verified: boolean;
  stripe_account_id: string;
  stripe_seller: {};
  stripeSession: {};
  courses: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    user_image: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: [String],
      default: ["Student"],
      enum: ["Student", "Instructor", "Admin"],
    },
    resetPassword: {
      data: String,
      default: "",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
