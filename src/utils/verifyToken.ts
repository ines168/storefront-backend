import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.TOKEN_SECRET || "";

const verifyToken = async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, secret);
  } catch (error) {
    res.status(401);
    return res.json(error);
  }
  next();
};

export default verifyToken;
