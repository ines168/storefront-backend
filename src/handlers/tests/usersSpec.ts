import supertest from "supertest";
import app from "../../index";
import { User, UserStore } from "../../models/user";

const request = supertest(app);

describe("Test users endpoints", async () => {
  const testUser: User = {
    first_name: "Jane",
    last_name: "Doe",
    hashed_password: "password123",
  };

  let token: string;

  let savedUser: User;

  it("expects successful response and new user created from POST/users", async () => {
    const response = await request.post("/users").send(testUser);
    savedUser = response.body.newUser;
    token = response.body.token;
    expect(response.status).toBe(200);
  });

  it("expects successful response and index all users from GET/users", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });

  it("expects successful response and show user from GET/users/:id", async () => {
    const response = await request.get(`/users/${savedUser.id}`);
    expect(response.status).toBe(200);
  });

  it("expects authorization failure 401 from PUT/users/:id without token", async () => {
    testUser.first_name = "James";
    const response = await request.put(`/users/${savedUser.id}`).send(testUser);
    expect(response.status).toBe(401);
  });

  it("expects successful response and edited user from PUT/users/:id", async () => {
    testUser.first_name = "James";
    const response = await request.put(`/users/${savedUser.id}`).set("Authorization", `Bearer ${token}`).send(testUser);
    expect(response.status).toBe(200);
  });

  it("expects authorization failure 401 from DELETE/users/:id without token", async () => {
    const response = await request.delete(`/users/${savedUser.id}`);
    expect(response.status).toBe(401);
  });

  it("expects successful response and deleted user from DELETE/users/:id", async () => {
    const response = await request.delete(`/users/${savedUser.id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
