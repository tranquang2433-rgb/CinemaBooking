import app from "./app.js";
import env from "./BackEnd/Config/env.js";
import { connectDB } from "./BackEnd/config/database.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`CinemaBooking dang chay tai http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Khong the chay:", error.message);
    process.exit(1);
  }
};

startServer();
