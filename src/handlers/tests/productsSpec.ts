import supertest from "supertest";
import app from "../../index";
import { Product, ProductStore } from "../../models/product";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiUGV0ZXIiLCJsYXN0X25hbWUiOiJQYW4iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTAkblZ5enQ3OEpsVHVWWENHQmVRaDlvZVZoWFZ6clNPQ3R0eHB1WW5jYm9kU2N3VG15RzNmWU8ifSwiaWF0IjoxNjk4OTMzNjk3fQ.MDY2M1wF3dcDbDfJ2mRzyTe4ARaECR7qC9nxxH2wq8o";

describe("Test products endpoints", async () => {
  const testProduct: Product = {
    name: "pencil",
    price: 2,
  };
  let savedProduct: Product;

  it("expects authorization failure 401 from POST/products without token", async () => {
    const response = await request.post("/products").send(testProduct);
    expect(response.status).toBe(401);
  });

  it("expects successful response and new product created from POST/products", async () => {
    const response = await request.post("/products").set("Authorization", `Bearer ${token}`).send(testProduct);
    savedProduct = response.body;
    expect(response.status).toBe(200);
  });
  it("expects successful response and products list from GET/products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
  it("expects successful response and show product from GET/producst/:id", async () => {
    const response = await request.get(`/products/${savedProduct.id}`);
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from PUT/products/:id without token", async () => {
    testProduct.price = 3;
    testProduct.id = savedProduct.id;
    const response = await request.put(`/products/${testProduct.id}`).send(testProduct);
    expect(response.status).toBe(401);
  });
  it("expects successful response and edited product from PUT/products/:id", async () => {
    testProduct.price = 3;
    testProduct.id = savedProduct.id;
    const response = await request.put(`/products/${testProduct.id}`).set("Authorization", `Bearer ${token}`).send(testProduct);
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from PUT/products/:id without token", async () => {
    const response = await request.delete(`/products/${savedProduct.id}`);
    expect(response.status).toBe(401);
  });
  it("expects successful response and deleted product from DELETE/products/:id", async () => {
    const response = await request.delete(`/products/${savedProduct.id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
