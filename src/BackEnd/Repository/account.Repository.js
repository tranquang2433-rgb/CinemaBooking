import { pool } from "../config/database.js";
export const findAllAccounts = async () => {
  const [rows] = await pool.query(
    `SELECT 
      users.user_id, 
      users.full_name, 
      users.email,
      users.phone,
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
export const findAccountById = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
      users.user_id, 
      users.full_name, 
      users.email,
      users.phone,
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
export const findAccountByEmail = async (email) => {
  const [result] = await pool.query(
    `SELECT 
      users.user_id, 
      users.full_name, 
      users.email,
      users.phone,
      users.password,
      users.created_at,
      users.updated_at,
      roles.role_id,
      roles.role_name
    FROM users JOIN roles ON users.role_id = roles.role_id
    WHERE users.email=?`,
    [email],
  );
  return result[0];
};

export const deleteAccountById = async (user_id) => {
  const [result] = await pool.query(`DELETE FROM users WHERE user_id = ?`, [
    user_id,
  ]);
  return result.affectedRows > 0;
};

export const updateAccountById = async (
  user_id,
  { fullname, email, phone },
) => {
  const [result] = await pool.query(
    `UPDATE users
     SET full_name = ?, email = ?, phone = ?
     WHERE user_id = ?`,
    [fullname, email, phone, user_id],
  );
  return result;
};
export const updatePassword = async (user_id, password) => {
  const [result] = await pool.query(
    `UPDATE users SET password = ? WHERE user_id = ?`,
    [password, user_id],
  );
  return result.affectedRows;
};
