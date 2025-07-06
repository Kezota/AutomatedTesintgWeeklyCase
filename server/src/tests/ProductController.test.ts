import request from "supertest";
import express from "express";
import router from "../routes";

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
      console.log("Token:", token); // Log the token to check if it's valid
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

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Product1",
          stock: 10,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty(
        "message",
        "Product created successfully"
      );
      expect(res.body).toHaveProperty("data");
      productId = res.body.data.id; // Save product ID for further tests
    });

    it("should return 400 if name is missing", async () => {
      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          stock: 10,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Name and stock are required");
    });

    it("should return 400 if stock is missing", async () => {
      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Product1",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Name and stock are required");
    });

    it("should return 400 if stock is not a number", async () => {
      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Product1",
          stock: "not-a-number",
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Stock must be a number");
    });
  });

  describe("PUT /products/:id", () => {
    it("should update an existing product", async () => {
      const res = await request(app)
        .put(`/products/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Product1 Updated",
          stock: 20,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Product updated successfully"
      );
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("stock", 20); // Ensure stock is updated
    });

    it("should return 400 if name is missing", async () => {
      const res = await request(app)
        .put(`/products/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          stock: 20,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Name and stock are required");
    });

    it("should return 404 if product does not exist", async () => {
      const res = await request(app)
        .put(`/products/99999`) // Non-existent product ID
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "NonExistentProduct",
          stock: 20,
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Product not found");
    });
  });

  describe("DELETE /products/:id", () => {
    it("should delete a product", async () => {
      const res = await request(app)
        .delete(`/products/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Product deleted successfully"
      );
      expect(res.body).toHaveProperty("data");
    });

    it("should return 404 if product does not exist", async () => {
      const res = await request(app)
        .delete(`/products/99999`) // Non-existent product ID
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Product not found");
    });
  });
});
