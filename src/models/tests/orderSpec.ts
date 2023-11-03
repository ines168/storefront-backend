import { Order, OrderStore } from "../order";
import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
let userId: number;
let productId: number;
describe("Order Model", async () => {
  afterAll(async () => {
    await userStore.delete(userId as unknown as number);
    await productStore.delete(productId as unknown as number);
  });

  describe(" Check that Order Model has all the methods", () => {
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

    it("should have an addProducts method", () => {
      expect(store.addProducts).toBeDefined();
    });
  });

  describe("check that all Order Model methods work", async () => {
    let testOrder: Order;
    let savedOrder: Order;

    beforeAll(async () => {
      const savedUser: User = await userStore.create({
        first_name: "Jane",
        last_name: "Doe",
        hashed_password: "password123",
      });
      userId = savedUser.id as number;
      const savedProduct: Product = await productStore.create({
        name: "paper A4",
        price: 2,
      });
      productId = savedProduct.id as number;
      testOrder = {
        status: "active",
        user_id: userId,
      };
    });

    it("create method should add an order", async () => {
      const result = await store.create(testOrder);
      savedOrder = result;
      expect(result).toEqual(jasmine.objectContaining(testOrder));
    });

    it("index method should return a list of orders", async () => {
      const result = await store.index();
      expect(result).toEqual([jasmine.objectContaining(testOrder)]);
    });

    it("show method should return the correct order", async () => {
      const result = await store.show(savedOrder.id as number);
      expect(result).toEqual(jasmine.objectContaining(testOrder));
    });

    it("edit method should update order", async () => {
      testOrder.status = "closed";
      testOrder.id = savedOrder.id;
      const result = await store.edit(testOrder);
      expect(result.status).not.toEqual(savedOrder.status);
    });

    it("delete method should remove the order", async () => {
      await store.delete(savedOrder.id as number);
      const result = await store.index();
      expect(result).toEqual([]);
    });
  });
});
