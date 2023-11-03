import supertest from "supertest";
import app from "../../index";
import { User, UserStore } from "../../models/user";

const request = supertest(app);
const userStore = new UserStore();
let userId: number;

describe("Test dashboard endpoints", async () => {
  beforeAll(async () => {
    const savedUser: User = await userStore.create({
      first_name: "James",
      last_name: "Deen",
      hashed_password: "password123",
    });
    userId = savedUser.id as number;
  });

  afterAll(async () => {
    await userStore.delete(userId);
  });

  it("expects successful response and GET/users/:id/current", async () => {
    const response = await request.get(`/users/${userId}/current`);
    expect(response.status).toBe(200);
  });
  it("expects successful response and GET/completed-orders/:id", async () => {
    const response = await request.get(`/completed-orders/${userId}`);
    expect(response.status).toBe(200);
  });
  it("expects successful response and GET/five-most-popular", async () => {
    const response = await request.get(`/five-most-popular`);
    expect(response.status).toBe(200);
  });
  it("expects successful response and GET/products/category/:category", async () => {
    const category = null;
    const response = await request.get(`/products/category/${category}`);
    expect(response.status).toBe(200);
  });
});
