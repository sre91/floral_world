<<<<<<< HEAD
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema: Schema<IUser> = new Schema(
=======
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
<<<<<<< HEAD
    isAdmin: { type: Boolean, default: false },
=======
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
  },
  { timestamps: true }
);

<<<<<<< HEAD
export default mongoose.model<IUser>("User", userSchema);
=======
const User = mongoose.model("users", userSchema);

export default User;
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
