import request from "supertest";
import { app } from "../src/index";
import { AppDataSource } from "../src/data-source";
import { Application } from "../src/entity/Application";

// Seed required test data before tests
async function seedDatabase() {
  const userRepo = AppDataSource.getRepository("User");
  const lecturerRepo = AppDataSource.getRepository("Lecturer");
  const candidateRepo = AppDataSource.getRepository("Candidate");
  const courseRepo = AppDataSource.getRepository("Course");
  const roleRepo = AppDataSource.getRepository("Role");

  const lecturerUser = await userRepo.save({
    email: "lecturer1@example.com",
    password: "pass",
    role: "lecturer",
    firstName: "Lect",
    lastName: "One",
    avatarConfig: {}, // ✅ required
  });

  const lecturer = await lecturerRepo.save({
    userId: lecturerUser.id,
  });

  const tutorUser = await userRepo.save({
    email: "tutor1@example.com",
    password: "abc",
    role: "tutor",
    firstName: "Tut",
    lastName: "One",
    avatarConfig: {}, // ✅ required
  });

  const candidate = await candidateRepo.save({
    user: tutorUser,
  });

  const course = await courseRepo.save({
    code: "FIT123",
    name: "Test Course",
    lecturer: lecturer,
  });

  const role = await roleRepo.save({
    name: "tutor",
  });

  return { lecturerUser, lecturer, candidate, course, role };
}

let seeded: Awaited<ReturnType<typeof seedDatabase>>;

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  seeded = await seedDatabase();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("ApplicationLecturerController API Tests", () => {
  // 1. GET all applications
  it("should get all applications", async () => {
    const res = await request(app).get("/teach_team/applications");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 2. GET by lecturer (valid)
  it("should return applications for a valid lecturer", async () => {
    const res = await request(app).get(`/teach_team/applications/by-lecturer/${seeded.lecturerUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 3. GET by lecturer (invalid)
  it("should return 404 for unknown lecturer", async () => {
    const res = await request(app).get("/teach_team/applications/by-lecturer/99999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Lecturer not found");
  });

  // 4. PATCH update application
  it("should update an application’s status", async () => {
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

  // 5. PATCH non-existent application
  it("should return 404 if updating a non-existent application", async () => {
    const res = await request(app)
      .patch("/teach_team/applications/99999")
      .send({ status: "rejected" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Application not found");
  });

  // 6. POST not implemented
  it("should return 501 for unimplemented create endpoint", async () => {
    const res = await request(app)
      .post("/teach_team/applications")
      .send({});
    expect(res.statusCode).toBe(501);
    expect(res.body.message).toBe("Not implemented");
  });
});
