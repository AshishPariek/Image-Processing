const express = require("express");
require("./config/db")();

const uploadRoutes = require("./routes/upload");
const statusRoutes = require("./routes/status");
const webhookRoutes = require("./routes/webhook");

const app = express();
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/status", statusRoutes);
app.use("/webhook", webhookRoutes);

app.listen(5600, () => console.log("Server started on port 5600"));
