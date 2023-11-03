import { User, UserStore } from "../user";
import bcrypt from "bcrypt";
import "dotenv/config";

const store = new UserStore();

describe("User Model:", () => {
  const testUser: User = {
    first_name: "Jane",
    last_name: "Doe",
    hashed_password: "password123",
  };
  const pepper = process.env.BCRYPT_PASSWORD;
  const saltRounds = process.env.SALT_ROUNDS || "";
  const hash = bcrypt.hashSync(testUser.hashed_password + pepper, parseInt(saltRounds));

  let savedUser: User;

  describe("Check that User Model has all the methods:", () => {
    it("should have a create method", () => {
      expect(store.create).toBeDefined();
    });

    it("should have an index method", () => {
      expect(store.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(store.show).toBeDefined();
    });

    it("should have an edit method", () => {
      expect(store.edit).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe("check that all User Model methods work:", async () => {
    it("create method should add a user", async () => {
      const result = await store.create(testUser);
      savedUser = result;
      expect(result.first_name).toEqual(testUser.first_name);
    });

    it("index method should return all the users", async () => {
      const result = await store.index();
      expect(result).toEqual([jasmine.objectContaining(savedUser)]);
    });

    it("show method should return the correct user", async () => {
      const result = await store.show(savedUser.id as number);
      expect(bcrypt.compare(testUser.hashed_password, result.hashed_password)).toBeTruthy;
    });

    it("edit method should update user", async () => {
      savedUser.first_name = "James";
      const result = await store.edit(savedUser);
      expect(result.first_name).not.toEqual(testUser.first_name);
    });

    it("delete method should remove the user", async () => {
      await store.delete(savedUser.id as number);
      const result = await store.show(savedUser.id as number);
      expect(result).toBeUndefined();
    });
  });
});
