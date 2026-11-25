import express from "express";
import cors from "cors";
import accountRoutes from "./BackEnd/Routes/accountRoutes.js";
import movieRoutes from "./BackEnd/Routes/movieRoutes.js";
import { errorMiddleware } from "./BackEnd/Middleware/errorMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CinemaBooking Backend is running!",
  });
});
app.use("/api/admin/accounts", accountRoutes);
app.use("/api/admin/movies", movieRoutes);
app.use(errorMiddleware);
export default app;
