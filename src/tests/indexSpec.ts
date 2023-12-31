import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test home endpoint", () => {
  it("expects successful response from the / endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
