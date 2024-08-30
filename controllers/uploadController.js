const csvParser = require("csv-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const ProcessingRequest = require("../models/ProcessingRequest");

// Simulate image processing function
const processImage = (inputUrl) => {
  // This is just a placeholder. Replace this with actual image processing logic.
  return inputUrl.replace("image-url", "image-output-url");
};

const processCSV = (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      if (!validateCSV(results)) {
        return res.status(400).json({ error: "Invalid CSV format" });
      }

      const processingRequests = results.map((row) => {
        const requestId = uuidv4(); // Generate a unique requestId for each row

        // Process each input URL to generate an output URL
        const outputUrls = row["Input Image Urls"]
          .split(",")
          .map((inputUrl) => processImage(inputUrl));

        return {
          requestId,
          productName: row["Product Name"],
          inputUrls: row["Input Image Urls"].split(","),
          outputUrls, // Add the processed output URLs here
        };
      });

      try {
        await ProcessingRequest.insertMany(processingRequests);

        // Extract requestIds to send in the response
        const requestIds = processingRequests.map((req) => req.requestId);

        res.json({
          message: "CSV processed successfully",
          requestIds, // Send all requestIds as part of the response
        });
      } catch (error) {
        console.error("Error inserting documents:", error);
        res.status(500).json({ error: "Failed to process the CSV file" });
      }
    });
};

const validateCSV = (data) => {
  return data.every((row) => row["Product Name"] && row["Input Image Urls"]);
};

module.exports = { processCSV };
