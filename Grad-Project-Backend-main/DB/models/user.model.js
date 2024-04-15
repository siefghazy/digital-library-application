import mongoose, { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      min: 8,
      max: 20,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    phone: String,
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    forgetCode: String,
    activationCode: String,
    wishlist:[
      {
          type:mongoose.Schema.ObjectId,
          ref:'product'
      }
  ]
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || model('User', userSchema);
export default userModel;
