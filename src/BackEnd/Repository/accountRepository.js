import { pool } from "../config/database.js";
export const findAllAccounts = async () => {
  const [rows] = await pool.query(
    `SELECT 
      users.user_id, 
      users.full_name, 
      users.email,
      users.phone,
      users.status,
      users.created_at,
      users.updated_at,
      roles.role_id,
      roles.role_name
    FROM users JOIN roles ON users.role_id = roles.role_id
    ORDER BY users.user_id DESC
    `,
  );
  return rows;
};
export const findAccountById = async (email) => {
  const [rows] = await pool.query(
    `SELECT 
      users.user_id, 
      users.full_name, 
      users.email,
      users.phone,
      users.status,
      users.created_at,
      users.updated_at,
      roles.role_id,
      roles.role_name
    FROM users JOIN roles ON users.role_id = roles.role_id
    WHERE users.user_id=?
    `,
    [id],
  );
  return rows[0];
};
// export const createUser = async () => {
//   const [result] = pool.query(
//     `INSERT INTO users(user_id,full_name,email,phone,status,)`,
//     [fullname, email, password, phone],
//   );
//   return result[0];
// };
