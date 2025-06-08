import { pool } from "../db";
const bcrypt = require("bcrypt");

export const resolvers = {
  allCandidates: async () => {
    try {
      const [candidates] = await pool.query(
        `SELECT 
        c.id as id, 
        CONCAT(u.firstName,' ',u.lastName) AS name,
        c.active AS active,
        c.createdAt as createdAt
        FROM candidate c
        JOIN user u ON c.user_id = u.id
        WHERE c.id IS NOT NULL`
      );

      if (candidates.length === 0) {
        return {
          success: true,
          message: "Empty Data",
          candidates: [],
        };
      }
      return {
        success: true,
        message: "Success",
        candidates: candidates,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error),
        candidates: [],
      };
    }
  },
  allLecturers: async () => {
    try {
      const [lecturers] = await pool.query(
        `SELECT 
        c.id as id, 
        CONCAT(u.firstName,' ',u.lastName) AS name,
        c.createdAt as createdAt
        FROM lecturer c
        JOIN user u ON c.user_id = u.id
        WHERE c.id IS NOT NULL`
      );

      if (lecturers.length === 0) {
        return {
          success: true,
          message: "Empty Data",
          lecturers: [],
        };
      }
      return {
        success: true,
        message: "Success",
        lecturers: lecturers,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error),
        lecturers: [],
      };
    }
  },

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
      c.id AS courseId,
      c.name AS courseName,
      c.semester AS semester,
      u.id AS id,
      u.firstName AS firstName,
      u.lastName AS lastName,
      u.email AS email,
      r.name AS role,
      a.availability AS availability
    FROM application a
    JOIN course c ON a.courseId = c.id
    JOIN candidate cand ON a.candidateId = cand.id
    JOIN user u ON cand.user_id = u.id
    JOIN role r ON a.roleId = r.id
    WHERE a.status = 'accepted'
  `);

    // Group by courseId
    const courseMap: Record<
      number,
      {
        courseName: string;
        semester: string;
        candidates: any[];
      }
    > = {};

    for (const row of rows) {
      const courseId = row.courseId;

      if (!courseMap[courseId]) {
        courseMap[courseId] = {
          courseName: row.courseName,
          semester: row.semester,
          candidates: [],
        };
      }

      courseMap[courseId].candidates.push({
        id: row.id,
        firstName: row.firstName,
        email: row.email,
        role: row.role,
        availability: row.availability,
        semester: row.semester,
      });
    }

    // Return array of reports
    return Object.values(courseMap);
  },

  candidatesWithMoreThan3Courses: async () => {
    const [rows] = await pool.query(`
    SELECT 
      u.id,
      CONCAT(u.firstName, ' ', u.lastName) AS name,
      u.email,
      c.name AS courseName,
      c.semester AS semester,
      r.name AS role,
      a.availability
    FROM application a
    JOIN course c ON a.courseId = c.id
    JOIN role r ON a.roleId = r.id
    JOIN candidate cand ON a.candidateId = cand.id
    JOIN user u ON cand.user_id = u.id
    WHERE a.status = 'accepted'
  `);

    // Group applications by candidate
    const candidateMap: Record<string, any> = {};

    for (const row of rows) {
      if (!candidateMap[row.id]) {
        candidateMap[row.id] = {
          id: row.id,
          name: row.name,
          email: row.email,
          courses: [],
        };
      }

      candidateMap[row.id].courses.push({
        courseName: row.courseName,
        semester: row.semester,
        role: row.role,
        availability: row.availability,
      });
    }

    // Filter candidates with more than 3 accepted courses
    return Object.values(candidateMap).filter((c: any) => c.courses.length > 3);
  },

  unselectedCandidates: async () => {
    const [rows] = await pool.query(`
    SELECT 
      u.id AS userId,
      CONCAT(u.firstName, ' ', u.lastName) AS name,
      u.email,
      c.name AS courseName,
      r.name AS role,
      a.availability
    FROM candidate cand
    JOIN user u ON cand.user_id = u.id
    JOIN application a ON a.candidateId = cand.id
    JOIN course c ON a.courseId = c.id
    JOIN role r ON a.roleId = r.id
    WHERE cand.id NOT IN (
      SELECT DISTINCT candidateId 
      FROM application 
      WHERE status = 'accepted'
    )
    AND a.status != 'accepted'
  `);

    const grouped: Record<string, any> = {};

    for (const row of rows) {
      if (!grouped[row.userId]) {
        grouped[row.userId] = {
          id: row.userId,
          name: row.name,
          email: row.email,
          applications: [],
        };
      }

      grouped[row.userId].applications.push({
        courseName: row.courseName,
        role: row.role,
        availability: row.availability,
      });
    }

    return Object.values(grouped);
  },

  updateCandidateActive: async (_, args) => {
    const { active, id } = args.body.variables;
    try {
      await pool.query("UPDATE candidate SET active = ? WHERE id = ?", [
        active,
        id,
      ]);

      const [updatedCandidates] = await pool.query(`
        SELECT 
        c.id as id, 
        CONCAT(u.firstName,' ',u.lastName) AS name,
        c.active AS active,
        c.createdAt as createdAt
        FROM candidate c
        JOIN user u ON c.user_id = u.id
        WHERE c.id IS NOT NULL`);

      return {
        success: true,
        message: "Status updated successfully",
        candidates: updatedCandidates,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update status",
        candidates: null,
      };
    }
  },

  getCourse: async (_: any, { id }: { id: number }) => {
    try {
      const [courses] = await pool.query(`SELECT * FROM course WHERE id = ?`, [
        id,
      ]);

      if (!courses[0]) {
        return {
          success: false,
          message: "Course not found",
          course: null,
          courses: null,
        };
      }

      return {
        success: true,
        message: "Course retrieved successfully",
        course: courses[0],
        courses: null,
      };
    } catch (error) {
      console.error("Error fetching course:", error);
      return {
        success: false,
        message: "Error fetching course",
        course: null,
        courses: null,
      };
    }
  },

  getAllCourses: async () => {
    try {
      const [courses] = await pool.query(
        `SELECT 
          c.id AS id,
          c.name AS name,
          c.code AS code,
          CONCAT(u.firstName, ' ', u.lastName) AS lecturerName,
          c.lecturerId AS lecturerId,
          c.createdAt AS createdAt,
          c.updatedAt AS updatedAt
        FROM course c
        LEFT JOIN lecturer l ON c.lecturerId = l.id  
        LEFT JOIN user u ON l.user_id = u.id`
      );

      return {
        success: true,
        message:
          courses.length > 0
            ? "Courses retrieved successfully"
            : "No courses found",
        course: null,
        courses: courses,
      };
    } catch (error) {
      console.error("Error fetching courses:", error);
      return {
        success: false,
        message: "Error fetching courses",
        course: null,
        courses: null,
      };
    }
  },

  getCoursesBySemester: async (_: any, { semester }: { semester: number }) => {
    try {
      const [courses] = await pool.query(
        `SELECT * FROM course WHERE semester = ? ORDER BY code`,
        [semester]
      );

      return {
        success: true,
        message:
          courses.length > 0
            ? "Courses retrieved successfully"
            : "No courses found for this semester",
        course: null,
        courses: courses,
      };
    } catch (error) {
      console.error("Error fetching courses by semester:", error);
      return {
        success: false,
        message: "Error fetching courses by semester",
        course: null,
        courses: null,
      };
    }
  },

  createCourse: async (_: any, args) => {
    try {
      const { code, name, lecturerId } = args.body.variables.input;

      // Validate course code format
      if (!/^COSC\d{4}$/.test(code)) {
        return {
          success: false,
          message: "Course code must be in COSCxxxx format",
          course: null,
          courses: null,
        };
      }

      const [result] = await pool.query(
        `INSERT INTO course (code, name,lecturerId) VALUES (?, ?, ?)`,
        [code, name, lecturerId]
      );

      const [newCourse] = await pool.query(
        `SELECT * FROM course WHERE id = ?`,
        [result.insertId]
      );

      return {
        success: true,
        message: "Course created successfully",
        course: newCourse[0],
        courses: null,
      };
    } catch (error) {
      console.error("Error creating course:", error);
      return {
        success: false,
        message: "Failed to create course. " + String(error),
        course: null,
        courses: null,
      };
    }
  },

  updateCourse: async (_: any, args) => {
    try {
      const { id, name, code, lecturerId } = args.body.variables;
      console.log(args.body.variables);

      if (code && !/^COSC\d{4}$/.test(code)) {
        return {
          success: false,
          message: "Course code must be in COSCxxxx format",
          course: null,
          courses: null,
        };
      }

      await pool.query(
        `UPDATE course SET name = ?, code = ?, lecturerId = ? WHERE id = ?`,
        [name, code, lecturerId, id]
      );

      const [updatedCourse] = await pool.query(
        `SELECT * FROM course WHERE id = ?`,
        [id]
      );

      return {
        success: true,
        message: "Course updated successfully",
        course: updatedCourse[0],
        courses: null,
      };
    } catch (error) {
      console.error("Error updating course:", error);
      return {
        success: false,
        message: "Failed to update course",
        course: null,
        courses: null,
      };
    }
  },

  deleteCourse: async (_: any, args) => {
    const { id } = args.body.variables;
    try {
      // First get the course before deleting for the response
      const [courseToDelete] = await pool.query(
        `SELECT * FROM course WHERE id = ?`,
        [id]
      );

      if (!courseToDelete[0]) {
        return {
          success: false,
          message: "Course not found",
          course: null,
          courses: null,
        };
      }

      await pool.query(`DELETE FROM course WHERE id = ?`, [id]);

      return {
        success: true,
        message: "Course deleted successfully",
        course: courseToDelete[0],
        courses: null,
      };
    } catch (error) {
      console.error("Error deleting course:", error);
      return {
        success: false,
        message: "Failed to delete course",
        course: null,
        courses: null,
      };
    }
  },

  assignLecturersToCourse: async (_, { courseId, lecturerIds }) => {
    try {
      // First clear existing assignments (or modify to merge)
      await pool.query("DELETE FROM course_lecturers WHERE course_id = ?", [
        courseId,
      ]);

      // Insert new assignments
      for (const lecturerId of lecturerIds) {
        await pool.query(
          "INSERT INTO course_lecturers (course_id, lecturer_id) VALUES (?, ?)",
          [courseId, lecturerId]
        );
      }

      // Fetch updated course with lecturers
      const [course] = await pool.query(
        `
          SELECT c.*, 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', l.id,
                'user', JSON_OBJECT(
                  'id', u.id,
                  'firstName', u.firstName,
                  'lastName', u.lastName
                )
              )
            ) AS lecturers
          FROM course c
          LEFT JOIN course_lecturers cl ON c.id = cl.course_id
          LEFT JOIN lecturer l ON cl.lecturer_id = l.id
          LEFT JOIN user u ON l.user_id = u.id
          WHERE c.id = ?
          GROUP BY c.id
        `,
        [courseId]
      );

      return {
        success: true,
        message: "Lecturers assigned successfully",
        course: {
          ...course[0],
          lecturers: JSON.parse(course[0].lecturers || "[]").filter(
            (l) => l.id
          ),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to assign lecturers",
        course: null,
      };
    }
  },

  removeLecturerFromCourse: async (_, { courseId, lecturerId }) => {
    try {
      await pool.query(
        "DELETE FROM course_lecturers WHERE course_id = ? AND lecturer_id = ?",
        [courseId, lecturerId]
      );

      // Return updated course
      const [course] = await pool.query(
        `
          SELECT * FROM course WHERE id = ?
        `,
        [courseId]
      );

      return {
        success: true,
        message: "Lecturer removed successfully",
        course: course[0],
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to remove lecturer",
        course: null,
      };
    }
  },
};
