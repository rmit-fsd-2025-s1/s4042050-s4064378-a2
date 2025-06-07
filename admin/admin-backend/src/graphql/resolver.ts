import { pool } from "../db";
const bcrypt = require("bcrypt");

export const resolvers = {
  // users: async () => {
  //   const [rows] = await pool.query("SELECT * FROM users");
  //   return rows;
  // },

  login: async (_, args) => {
    const { username, password } = args.body.variables;
    console.log(username, password);
    const [admins] = await pool.query(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    if (admins.length === 0) {
      return {
        success: false,
        message: "Invalid credentials",
        user: null,
      };
    }

    const admin = admins[0];
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return {
        success: false,
        message: "Invalid credentials",
        user: null,
      };
    }

    return {
      success: true,
      message: "Login successful",
      user: {
        id: admin.id,
        username: admin.username,
      },
    };
  },
};
