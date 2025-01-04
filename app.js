require("dotenv").config();

const http = require("http");
const cors = require("cors");
const express = require("express");
const db = require("./models/index");

const app = express();
const httpServer = http.createServer(app);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

// Version
const version = "1.0.0";
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("vedicerp is running...");
});

app.get("/version", (req, res) => res.send(version));
app.get("/ping", (req, res) => res.send("pong"));

app.use("/apis", require("./src/apis/api.router"));
app.use("/docs", require("./src/docs/doc.router"));
app.use("/public", require("./src/public/public.router"));

(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");

    // Start Server
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
