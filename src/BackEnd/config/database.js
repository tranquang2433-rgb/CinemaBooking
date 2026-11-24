import mysql2 from "mysql2/promise";
import env from "../Config/env.js";

// console.log("Database configuration:");
// console.log("Host:", env.DB_HOST);
// console.log("User:", env.DB_USER);
// console.log("Database:", env.DB_NAME);
// console.log("Port:", env.DB_PORT);

const pool = mysql2.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: Number(env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL connected successfully");

    connection.release();
  } catch (error) {
    console.error("Loi ket noi den MySQL:", error.message);
    throw error;
  }
};

export { pool };
