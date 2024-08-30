const axios = require("axios");
const sharp = require("sharp");
const ProcessingRequest = require("../models/ProcessingRequest");

const processImages = async (requestId) => {
  const requests = await ProcessingRequest.find({ requestId });

  for (const req of requests) {
    const outputUrls = [];

    for (const url of req.inputUrls) {
      const response = await axios({ url, responseType: "arraybuffer" });
      const buffer = await sharp(response.data)
        .resize({ width: Math.round(response.data.width / 2) })
        .toBuffer();

      const outputUrl = saveToCloudStorage(buffer); // Implement this function
      outputUrls.push(outputUrl);
    }

    req.outputUrls = outputUrls;
    req.status = "Completed";
    await req.save();
  }

  // Trigger webhook if needed
};

module.exports = { processImages };
