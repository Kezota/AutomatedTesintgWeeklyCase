import request from "supertest";
import express from "express";
import router from "../../src/routes";

const app = express();
app.use(express.json());
app.use("/", router);

let token: string;
let productId: number;

beforeAll(async () => {
  // Register a new user
  const res = await request(app).post("/register").send({
    email: "test2@example.com",
    password: "password123",
  });

  token = res.body.token;
});

describe("ProductController", () => {
  describe("GET /products", () => {
    it("should retrieve all products", async () => {
      const res = await request(app)
        .get("/products")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Products retrieved successfully"
      );
      expect(res.body).toHaveProperty("data");
    });
  });
});
