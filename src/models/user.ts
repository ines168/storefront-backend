import "dotenv/config";
// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD: pepper } = process.env;
const saltRounds = process.env.SALT_ROUNDS || "";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  hashed_password: string;
};

export class UserStore {
  async create(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `INSERT INTO users (first_name, last_name, hashed_password) VALUES ($1, $2, $3) RETURNING *;`;
      const hash = bcrypt.hashSync(user.hashed_password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [user.first_name, user.last_name, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create user ${user.first_name}. Error: ${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM users;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not list all the users. Error: ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`);
    }
  }

  async edit(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `UPDATE users SET first_name=($1), last_name=($2) WHERE id=($3) RETURNING *;`;
      const result = await conn.query(sql, [user.first_name, user.last_name, user.id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not edit user ${user.id}. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `DELETE FROM users WHERE id=($1) RETURNING *;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete user ${id}. Error: ${error}`);
    }
  }
}
