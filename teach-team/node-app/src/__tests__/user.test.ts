import request from "supertest";
import { app } from "../index";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

describe("UserController API Tests", () => {
  let createdUserId: number;

  // Initialize the database before running tests
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  // Clean up database connection after all tests
  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  /**
   * Test: Create a new user
   * Endpoint: POST /teach_team/users
   * Expects: 201 status code and a user ID in response
   */
  it("should create a new user", async () => {
    const res = await request(app).post("/teach_team/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "lecturer",
      avatarConfig: {},
    });

    expect(res.statusCode).toBe(201);
    createdUserId = res.body.id; // Store created user ID for future tests
  });

  /**
   * Test: Get all users
   * Endpoint: GET /teach_team/users
   * Expects: 200 status and a list of users
   */
  it("should return all users", async () => {
    const res = await request(app).get("/teach_team/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /**
   * Test: Get a user by ID
   * Endpoint: GET /teach_team/users/:id
   * Expects: 200 status and matching user data
   */
  it("should return a user by ID", async () => {
    const res = await request(app).get(`/teach_team/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("john.doe@example.com");
  });

  /**
   * Test: Valid login
   * Endpoint: POST /teach_team/users/login
   * Expects: 200 status and valid user data
   */
  it("should login a valid user", async () => {
    const res = await request(app).post("/teach_team/users/login").send({
      email: "john.doe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("john.doe@example.com");
  });

  /**
   * Test: Update user details
   * Endpoint: PUT /teach_team/users/:id
   * Expects: 200 status and updated user data
   */
  it("should update a user", async () => {
    const res = await request(app).put(`/teach_team/users/${createdUserId}`).send({
      firstName: "Johnny",
      lastName: "Doe",
      email: "johnny.doe@example.com",
      avatarConfig: {},
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Johnny");
  });

  /**
   * Test: Delete a user
   * Endpoint: DELETE /teach_team/users/:id
   * Expects: 200 status and confirmation message
   */
  it("should delete the user", async () => {
    const res = await request(app).delete(`/teach_team/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User removed successfully");
  });

  /**
   * Test: Failed login attempt (wrong password)
   * Endpoint: POST /teach_team/users/login
   * Expects: 401 unauthorized
   */
  it("should fail login with wrong password", async () => {
    const res = await request(app).post("/teach_team/users/login").send({
      email: "johnny.doe@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  /**
   * Test: Get a non-existent user
   * Endpoint: GET /teach_team/users/:id
   * Expects: 404 not found
   */
  it("should return 404 for non-existent user", async () => {
    const res = await request(app).get("/teach_team/users/99999");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});
