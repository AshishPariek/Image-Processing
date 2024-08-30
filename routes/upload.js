const express = require("express");
const multer = require("multer");
const { processCSV } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), processCSV);

module.exports = router;
