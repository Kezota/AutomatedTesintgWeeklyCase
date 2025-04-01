import request from "supertest";
import express from "express";
import router from "../routes";

const app = express();
app.use(express.json());
app.use("/", router);

describe("AuthController", () => {
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/register").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token"); // Expect token to be present
      expect(res.body).toHaveProperty("expiresIn");
      expect(res.body).toHaveProperty("user"); // Expect user info
    });

    it("should return 400 if email is missing", async () => {
      const res = await request(app).post("/register").send({
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Email and password are required"
      );
    });

    it("should return 400 if password is missing", async () => {
      const res = await request(app).post("/register").send({
        email: "test@example.com",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Email and password are required"
      );
    });

    it("should return 400 if email is invalid", async () => {
      const res = await request(app).post("/register").send({
        email: "invalid-email",
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid email format");
    });

    it("should return 409 if email already exists", async () => {
      await request(app).post("/register").send({
        email: "test@example.com",
        password: "password123",
      });
      const res = await request(app).post("/register").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("message", "Email already exists");
    });
  });

  describe("POST /login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/login").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token"); // Expect token to be present
      expect(res.body).toHaveProperty("expiresIn");
      expect(res.body).toHaveProperty("user"); // Expect user info
    });

    it("should return 400 if email is missing", async () => {
      const res = await request(app).post("/login").send({
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Email and password are required"
      );
    });

    it("should return 400 if password is missing", async () => {
      const res = await request(app).post("/login").send({
        email: "test@example.com",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Email and password are required"
      );
    });

    it("should return 400 if email is invalid", async () => {
      const res = await request(app).post("/login").send({
        email: "invalid-email",
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid email format");
    });

    it("should return 404 if user is not found", async () => {
      const res = await request(app).post("/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 401 if password is incorrect", async () => {
      const res = await request(app).post("/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid password");
    });
  });
});
