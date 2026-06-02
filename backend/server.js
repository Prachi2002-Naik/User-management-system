const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Server Running...");
});

// ❌ OLD connectDB() + app.listen REMOVE करायचं

// ✅ NEW START SERVER LOGIC
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

  } catch (error) {
    console.log("Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();