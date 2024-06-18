import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import translateRoutes from './routes/translate.route.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const PORT = process.env.PORT || 8081;


app.listen(PORT, () => {
  console.log("Server Started on port " + PORT);
});

app.use("/api/v1", translateRoutes);

app.get("/", (_, res) => {
  res.send("You are now live with Kalakrit AI");
});

app.get("/:any", (_, res) => {
  res.status(404).json({ message: "404 Page not found" });
});
