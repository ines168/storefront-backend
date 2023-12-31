import supertest from "supertest";
import { Order, OrderStore } from "../../models/order";
import app from "../../index";
import { User, UserStore } from "../../models/user";
import { Product, ProductStore } from "../../models/product";

const request = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
let userId: number;
let productId: number;

describe("Test orders endpoints", async () => {
  let testOrder: Order;
  let savedOrder: Order;
  let token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiUGV0ZXIiLCJsYXN0X25hbWUiOiJQYW4iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTAkblZ5enQ3OEpsVHVWWENHQmVRaDlvZVZoWFZ6clNPQ3R0eHB1WW5jYm9kU2N3VG15RzNmWU8ifSwiaWF0IjoxNjk4OTMzNjk3fQ.MDY2M1wF3dcDbDfJ2mRzyTe4ARaECR7qC9nxxH2wq8o";

  beforeAll(async () => {
    const testUser: User = await userStore.create({
      first_name: "Jane",
      last_name: "Doe",
      hashed_password: "password123",
    });
    userId = testUser.id as number;
    const testProduct: Product = await productStore.create({
      name: "pencil",
      price: 2,
    });
    productId = testProduct.id as number;
    testOrder = {
      status: "active",
      user_id: userId,
    };
  });

  it("expects successful response and created order from POST/orders", async () => {
    const response = await request.post("/orders").send(testOrder);
    savedOrder = response.body;
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from GET/orders without token", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(401);
  });
  it("expects successful response and list of orders from GET/orders with token", async () => {
    const response = await request.get("/orders").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from GET/orders/:id without token", async () => {
    const response = await request.get(`/orders/${savedOrder.id}`);
    expect(response.status).toBe(401);
  });
  it("expects successful response and show order from GET/orders/:id with token", async () => {
    const response = await request.get(`/orders/${savedOrder.id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from PUT/orders/:id without token", async () => {
    testOrder.status = "closed";
    const response = await request.put(`/orders/${savedOrder.id}`).send(testOrder);
    expect(response.status).toBe(401);
  });
  it("expects successful response and edited orders from PUT/orders/:id with token", async () => {
    testOrder.status = "closed";
    const response = await request.put(`/orders/${savedOrder.id}`).send(testOrder).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from DELETE/orders/:id without token", async () => {
    const response = await request.delete(`/orders/${savedOrder.id}`);
    expect(response.status).toBe(401);
  });
  it("expects successful response and deleted order from DELETE/orders/:id", async () => {
    const response = await request.delete(`/orders/${savedOrder.id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("expects successful response and product added to order from POST/orders/:id/product", async () => {
    const response = await request.post(`/orders/${savedOrder.id}/product`).send({ product_id: productId, quantity: 20, order_id: savedOrder.id });
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await userStore.delete(userId);
    await productStore.delete(productId);
  });
});
