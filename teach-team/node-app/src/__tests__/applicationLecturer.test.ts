import request from "supertest";
import { app } from "../index";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";

/**
 * Seeds the database with test data for User, Lecturer, Candidate, Course, and Role.
 * Required for testing the ApplicationLecturerController endpoints.
 */
async function seedDatabase() {
  const userRepo = AppDataSource.getRepository("User");
  const lecturerRepo = AppDataSource.getRepository("Lecturer");
  const candidateRepo = AppDataSource.getRepository("Candidate");
  const courseRepo = AppDataSource.getRepository("Course");
  const roleRepo = AppDataSource.getRepository("Role");

  // Create a lecturer user and lecturer entity
  const lecturerUser = await userRepo.save({
    email: "lecturer1@example.com",
    password: "pass",
    role: "lecturer",
    firstName: "Lect",
    lastName: "One",
    avatarConfig: {}, // Required field
  });
  const lecturer = await lecturerRepo.save({ userId: lecturerUser.id });

  // Create a tutor user and candidate entity
  const tutorUser = await userRepo.save({
    email: "tutor1@example.com",
    password: "abc",
    role: "tutor",
    firstName: "Tut",
    lastName: "One",
    avatarConfig: {}, // Required field
  });
  const candidate = await candidateRepo.save({ user: tutorUser });

  // Create a course and assign it to the lecturer
  const course = await courseRepo.save({
    code: "FIT123",
    name: "Test Course",
    lecturer: lecturer,
  });

  // Create a tutor role
  const role = await roleRepo.save({ name: "tutor" });

  return { lecturerUser, lecturer, candidate, course, role };
}

let seeded: Awaited<ReturnType<typeof seedDatabase>>;

/**
 * Initialize the data source and seed data before running tests
 */
beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  seeded = await seedDatabase();
});

/**
 * Close DB connection after all tests
 */
afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("ApplicationLecturerController API Tests", () => {
  /**
   * Test: GET /teach_team/applications
   * Verifies that all applications can be fetched successfully
   */
  it("should get all applications", async () => {
    const res = await request(app).get("/teach_team/applications");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /**
   * Test: GET /teach_team/applications/by-lecturer/:lecturerId
   * Verifies applications are returned for a valid lecturer
   */
  it("should return applications for a valid lecturer", async () => {
    const res = await request(app).get(`/teach_team/applications/by-lecturer/${seeded.lecturerUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /**
   * Test: GET /teach_team/applications/by-lecturer/:lecturerId
   * Verifies 404 response for a non-existent lecturer
   */
  it("should return 404 for unknown lecturer", async () => {
    const res = await request(app).get("/teach_team/applications/by-lecturer/99999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Lecturer not found");
  });

  /**
   * Test: PATCH /teach_team/applications/:applicationId
   * Creates a new application and updates its status, rank, and comment
   */
  it("should update an application’s status", async () => {
    // Create a new application
    const newApp = AppDataSource.getRepository(Application).create({
      candidate: seeded.candidate,
      course: seeded.course,
      role: seeded.role,
      availability: "part-time",
      skills: ["Node.js"],
      credentials: [],
      previousRoles: [],
      status: "pending",
      rank: 0,
    });
    const savedApp = await AppDataSource.getRepository(Application).save(newApp);

    // Send PATCH request to update the application
    const res = await request(app)
      .patch(`/teach_team/applications/${savedApp.id}`)
      .send({
        status: "accepted",
        rank: 1,
        comment: "Recommended",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.application.status).toBe("accepted");
    expect(res.body.application.rank).toBe(1);
    expect(res.body.application.comment).toBe("Recommended");
  });

  /**
   * Test: PATCH /teach_team/applications/:applicationId
   * Verifies 404 response when trying to update a non-existent application
   */
  it("should return 404 if updating a non-existent application", async () => {
    const res = await request(app)
      .patch("/teach_team/applications/99999")
      .send({ status: "rejected" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Application not found");
  });

  /**
   * Test: POST /teach_team/applications
   * Verifies that unimplemented POST endpoint returns 501
   */
  it("should return 501 for unimplemented create endpoint", async () => {
    const res = await request(app)
      .post("/teach_team/applications")
      .send({});

    expect(res.statusCode).toBe(501);
    expect(res.body.message).toBe("Not implemented");
  });
});
