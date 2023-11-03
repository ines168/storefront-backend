import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import verifyToken from "../utils/verifyToken";

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    res.send(newProduct);
  } catch (error) {
    res.send(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await store.show(id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: parseInt(req.params.id),
      name: req.body.name,
      price: parseInt(req.body.price),
      category: req.body.category,
    };
    const editedProduct = await store.edit(product);
    res.send(editedProduct);
  } catch (error) {
    res.send(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await store.delete(id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const product_routes = (app: express.Application) => {
  app.post("/products", verifyToken, create);
  app.get("/products", index);
  app.get("/products/:id", show);
  app.put("/products/:id", verifyToken, edit);
  app.delete("/products/:id", verifyToken, deleteProduct);
};

export default product_routes;
