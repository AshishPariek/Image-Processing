const mongoose = require("mongoose");

const ProcessingRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  inputUrls: { type: [String], required: true },
  outputUrls: { type: [String] },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("ProcessingRequest", ProcessingRequestSchema);
