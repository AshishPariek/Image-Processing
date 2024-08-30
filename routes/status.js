const express = require("express");
const ProcessingRequest = require("../models/ProcessingRequest");

const router = express.Router();

router.get("/:requestId", async (req, res) => {
  const requestId = req.params.requestId;
  const request = await ProcessingRequest.findOne({ requestId });

  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }

  res.json({ status: request.status, outputUrls: request.outputUrls });
});

module.exports = router;
