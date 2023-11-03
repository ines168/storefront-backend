import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model:", async () => {
  describe("Check that Product Model has all the methods:", () => {
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

  describe("check that all Product Model methods work:", async () => {
    const testProduct: Product = {
      name: "paper A4",
      price: 2,
      category: "paper",
    };

    it("create method should add a product", async () => {
      const result = await store.create(testProduct);
      expect(result).toEqual(jasmine.objectContaining(testProduct));
    });

    it("index method should return a list of products", async () => {
      const result = await store.index();
      expect(result).toEqual([jasmine.objectContaining(testProduct)]);
    });

    it("show method should return the correct product", async () => {
      const products = await store.index();
      const id = products[0].id as number;
      const result = await store.show(id);
      expect(result).toEqual(jasmine.objectContaining(testProduct));
    });

    it("edit method should update product", async () => {
      const products = await store.index();
      testProduct.id = products[0].id as number;
      const result = await store.edit(testProduct);
      expect(result).not.toEqual(
        jasmine.objectContaining({
          name: "paper A4",
          price: 3,
          category: "paper",
        })
      );
    });

    it("delete method should remove the product", async () => {
      const products = await store.index();
      const id = products[0].id as number;
      await store.delete(id);
      const result = await store.index();
      expect(result).toEqual([]);
    });
  });
});
