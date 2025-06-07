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

  candidatesByCourse: async () => {
    const [rows] = await pool.query(`
    SELECT 
      c.name AS courseName,
      u.id AS id,
      u.firstName AS firstName,
      u.lastName AS lastName,
      u.email AS email
    FROM application a
    JOIN course c ON a.courseId = c.id
    JOIN candidate cand ON a.candidateId = cand.id
    JOIN user u ON cand.user_id = u.id
    WHERE a.status = 'accepted'
  `);

    // Group users under each course
    const courseMap: Record<string, any[]> = {};
    for (const row of rows) {
      if (!courseMap[row.courseName]) {
        courseMap[row.courseName] = [];
      }
      courseMap[row.courseName].push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
      });
    }

    // Convert to Report[]
    return Object.entries(courseMap).map(([courseName, candidates]) => ({
      courseName,
      candidates,
    }));
  },

  candidatesWithMoreThan3Courses: async () => {
    const [rows] = await pool.query(`
        SELECT u.id, u.firstName, u.lastName, u.email
        FROM application a
        JOIN candidate c ON a.candidateId = c.id
        JOIN user u ON c.user_id = u.id
        WHERE a.status = 'accepted'
        GROUP BY u.id
        HAVING COUNT(DISTINCT a.courseId) > 3
      `);
    return rows;
  },

  unselectedCandidates: async () => {
    const [rows] = await pool.query(`
        SELECT u.id, u.firstName, u.lastName, u.email
        FROM candidate c
        JOIN user u ON c.user_id = u.id
        LEFT JOIN (
          SELECT DISTINCT candidateId
          FROM application
          WHERE status = 'accepted'
        ) accepted ON c.id = accepted.candidateId
        WHERE accepted.candidateId IS NULL
      `);
    return rows;
  },

};
