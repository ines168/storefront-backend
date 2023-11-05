import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import verifyToken from "../utils/verifyToken";

const dashboard = new DashboardQueries();

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const products = await dashboard.productsByCategory(category);
    res.send(products);
  } catch (error) {
    res.send(error);
  }
};

const fiveMostPopular = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostPopular();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
};

const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const orders = await dashboard.completedOrdersByUser(id);
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
};

const currentOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const order = await dashboard.currentOrder(id);
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

const dashboard_routes = (app: express.Application) => {
  app.get("/users/:id/current", verifyToken, currentOrder);
  app.get("/completed-orders/:id", verifyToken, completedOrdersByUser);
  app.get("/five-most-popular", fiveMostPopular);
  app.get("/products/category/:category", productsByCategory);
};

export default dashboard_routes;
