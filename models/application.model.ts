import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicationName: {
    type: String,
    required: true,
    unique: true,
  },
  applicationDescription: String,
  applicationIpAddress: String,
  applicationMOTSId: String,
  hostDetails: { type: String, enum: ["Cloud", "ONPRIME","Others"], required: true },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default Application;
