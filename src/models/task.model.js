import mongoose from "mongoose";

const tastkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //referencia al nombre del modelo de mongoose
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", tastkSchema);
