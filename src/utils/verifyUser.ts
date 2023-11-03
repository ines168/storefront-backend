import express, { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.TOKEN_SECRET || "";

interface TokenInterface {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    hashed_password: string;
  };
}

const verifyUser = async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    const user: User = {
      id: parseInt(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hashed_password: req.body.hashed_password,
    };
    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    const userDecoded = (decoded as TokenInterface).user;
    if (userDecoded.id !== user.id) {
      throw new Error(`User id does not match!`);
    }
  } catch (error) {
    res.status(401);
    return res.json(error);
  }
  next();
};

export default verifyUser;
