const express = require("express");
const http = require("http");
const db = require("./models");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verifyToken");
require("dotenv").config();
const cors = require("cors");

// Import routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const bidRouter = require("./routes/bidRouter");
const reviewRouter = require("./routes/reviewRouter");
const productLikeRouter = require("./routes/productLikeRouter");
const chatRouter = require("./routes/chatRouter");

const { init } = require("./socket/io");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app); // Create the server *before* initializing Socket.IO
init(server); // Initialize Socket.IO with the server

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);

// Mount routers at specific paths
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/bids", bidRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/chats", chatRouter);

// Test Route
app.get("/health", (req, res) => {
  res.send("Server is running!");
});
// DB-independent health to allow front-end testing even if DB is down
app.get("/health-no-db", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});


// Database Connection and Server Start
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced.");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    if (err.name === "SequelizeConnectionError" || err.name === "SequelizeConnectionRefusedError") {
      console.error("Unable to connect to the database:", err.message);
      // Start server anyway so /health-no-db and static routes work during local bootstrap
      server.listen(port, () => {
        console.log(`Server (degraded, no DB) is running on port ${port}`);
      });
    } else {
      console.error("An error occurred during database sync:", err);
    }
  });
