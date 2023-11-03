import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import verifyUser from "../utils/verifyUser";

const store = new UserStore();
const secret = process.env.TOKEN_SECRET || "";

const createUser = async (req: Request, res: Response) => {
  // console.log(`This is create`);
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hashed_password: req.body.hashed_password,
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, secret);
    res.send({ newUser, token });
  } catch (error) {
    res.send(error);
  }
};

const indexUsers = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

const showUser = async (req: Request, res: Response) => {
  // console.log(`show console`);
  try {
    const id = parseInt(req.params.id);
    const user = await store.show(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

const editUser = async (req: Request, res: Response) => {
  // console.log(`edit console`);
  try {
    const user: User = {
      id: parseInt(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hashed_password: req.body.hashed_password,
    };
    const editedUser = await store.edit(user);
    let token = jwt.sign({ user: editedUser }, secret);
    res.send([editedUser, token]);
  } catch (error) {
    res.send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  // console.log(`delete console`);
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await store.delete(id);
    res.send(deletedUser);
  } catch (error) {
    res.send(error);
  }
};

const user_routes = (app: express.Application) => {
  app.post("/users", createUser);
  app.get("/users", indexUsers);
  app.get("/users/:id", showUser);
  app.put("/users/:id", verifyUser, editUser);
  app.delete("/users/:id", verifyUser, deleteUser);
};

export default user_routes;
