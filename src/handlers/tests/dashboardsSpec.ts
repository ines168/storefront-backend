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

  let token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdF9uYW1lIjoiUGV0ZXIiLCJsYXN0X25hbWUiOiJQYW4iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTAkblZ5enQ3OEpsVHVWWENHQmVRaDlvZVZoWFZ6clNPQ3R0eHB1WW5jYm9kU2N3VG15RzNmWU8ifSwiaWF0IjoxNjk4OTMzNjk3fQ.MDY2M1wF3dcDbDfJ2mRzyTe4ARaECR7qC9nxxH2wq8o";

  it("expects authorization failure 401 from GET/users/:id/current without token", async () => {
    const response = await request.get(`/users/${userId}/current`);
    expect(response.status).toBe(401);
  });
  it("expects successful response and GET/users/:id/current with token", async () => {
    const response = await request.get(`/users/${userId}/current`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("expects authorization failure 401 from GET/completed-orders/:id without token", async () => {
    const response = await request.get(`/completed-orders/${userId}`);
    expect(response.status).toBe(401);
  });
  it("expects successful response and GET/completed-orders/:id with token", async () => {
    const response = await request.get(`/completed-orders/${userId}`).set("Authorization", `Bearer ${token}`);
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
