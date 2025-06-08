import request from "supertest";
import { app } from "../src/index";
import { AppDataSource } from "../src/data-source";
import { Course } from "../src/entity/Course";
import { User } from "../src/entity/User";
import { Lecturer } from "../src/entity/Lecturer";

// Global variables to hold the created lecturer entities for use in tests
let lecturerUser: User;
let lecturer: Lecturer;

/**
 * Seed the database with required mock data:
 * - A lecturer user
 * - A linked lecturer entity
 * - A course assigned to that lecturer
 * This ensures the course route has data to return during the test.
 */
async function seedCourses() {
  const userRepo = AppDataSource.getRepository(User);
  const lecturerRepo = AppDataSource.getRepository(Lecturer);
  const courseRepo = AppDataSource.getRepository(Course);

  // Create a mock lecturer user
  lecturerUser = await userRepo.save({
    email: "lect1@example.com",
    password: "abc123",
    role: "lecturer",
    firstName: "Lect",
    lastName: "One",
    avatarConfig: {}, // Required field based on entity definition
  });

  // Create a Lecturer entity linked to the above user
  lecturer = await lecturerRepo.save({
    userId: lecturerUser.id,
  });

  // Add a course taught by the created lecturer
  await courseRepo.save({
    code: "COSC1234",
    name: "Intro to Backend",
    lecturer: lecturer,
    semester: 1, // Required field
  });
}

// Runs once before all tests in this file
beforeAll(async () => {
  // Initialize the data source (TypeORM connection) if not already
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  // Populate the DB with test data
  await seedCourses();
});

// Runs once after all tests complete to clean up
afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("GET /teach_team/courses", () => {
  /**
   * Test to verify that the endpoint returns a list of all courses.
   * Expected:
   * - 200 OK status
   * - Response body is an array
   * - At least one course (seeded)
   * - Each course contains required properties like 'code' and 'name'
   */
  it("should return a list of all courses", async () => {
    // Send GET request to the endpoint
    const res = await request(app).get("/teach_team/courses");

    // ✅ Response should be successful
    expect(res.statusCode).toBe(200);

    // ✅ Response body must be an array
    expect(Array.isArray(res.body)).toBe(true);

    // ✅ Should contain at least one course from the seeded data
    expect(res.body.length).toBeGreaterThan(0);

    // ✅ Each course should include expected properties
    expect(res.body[0]).toHaveProperty("code");
    expect(res.body[0]).toHaveProperty("name");
  });
});
