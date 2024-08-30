const express = require("express");
const ProcessingRequest = require("../models/ProcessingRequest");

const router = express.Router();

router.post("/callback", async (req, res) => {
  const { requestId, status } = req.body;

  await ProcessingRequest.updateMany({ requestId }, { status });

  res.json({ message: "Webhook received" });
});

module.exports = router;
