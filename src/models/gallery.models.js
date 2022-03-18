const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    profile_Id:{ type: mongoose.Schema.Types.ObjectId, ref:"user",required: true },
    galleryPic: [{type: String, required: false}],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("gallery", gallerySchema);
 