import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./routes/task.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.listen(port, async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Connected to MongoDB successfully! Database: ${conn.connections[0].name}`
    );
    console.log(`Server is running on port http://localhost:${port}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
});
