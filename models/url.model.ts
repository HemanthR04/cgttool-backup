import mongoose, { Schema } from "mongoose";

const urlSchema = new mongoose.Schema({
    type: String,
    link: String,
    clientApps: [{
      name:String,
      url:String
    }],
    environment:{
      type: String,
      enum: ['ETE1', 'ETE2','R1'],
      required: true,
    },
    application:{ type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { toJSON: { getters: true } });
  

const URLS =
  mongoose.models.URLS ||
  mongoose.model("URLS", urlSchema);

export default URLS;
