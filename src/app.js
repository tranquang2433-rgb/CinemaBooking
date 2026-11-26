import express from "express";
import cors from "cors";

import accountRoutes from "./BackEnd/Routes/account.Routes.js";
import userRoutes from "./BackEnd/Routes/user.Routes.js";
import movieRoutes from "./BackEnd/Routes/movieRoutes.js";
import customerMovieRoutes from "./BackEnd/Routes/customerMovie.Routes.js";

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
app.use("/api/user", userRoutes);
app.use("/api/movies", customerMovieRoutes);

app.use(errorMiddleware);

export default app;
