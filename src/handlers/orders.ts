import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyToken from "../utils/verifyToken";

const store = new OrderStore();

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: parseInt(req.body.user_id),
    };
    const newOrder = await store.create(order);
    res.send(newOrder);
  } catch (error) {
    res.send(error);
  }
};

const indexOrder = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
};

const showOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await store.show(id);
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

const editOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: parseInt(req.params.id),
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const editedOrder = await store.edit(order);
    res.send(editedOrder);
  } catch (error) {
    res.send(error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await store.delete(id);
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    const product = await store.addProducts(product_id, quantity, order_id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const order_routes = (app: express.Application) => {
  app.post("/orders", createOrder);
  app.get("/orders", verifyToken, indexOrder);
  app.get("/orders/:id", verifyToken, showOrder);
  app.put("/orders/:id", verifyToken, editOrder);
  app.delete("/orders/:id", verifyToken, deleteOrder);
  app.post("/orders/:id/product", addProduct);
};

export default order_routes;
