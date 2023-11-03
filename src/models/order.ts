// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;`;
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create new order. Error: ${error}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not list all the orders. Error: ${error}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE id=($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find order ${id}. Error: ${error}`);
    }
  }

  async edit(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `UPDATE orders SET status=($1) WHERE id=($2) RETURNING *;`;
      const result = await conn.query(sql, [order.status, order.id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not edit order ${order.id}. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `DELETE FROM orders WHERE id=($1) RETURNING *;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete order ${id}. Error: ${error}`);
    }
  }

  async addProducts(product_id: number, quantity: number, order_id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT status FROM orders WHERE id=($1);`;
      const result = await conn.query(sql, [order_id]);
      conn.release();
      if (result.rows[0].status !== "active") {
        throw new Error(`Could not add product to closed order`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }

    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `INSERT INTO order_products (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING *;`;
      const result = await conn.query(sql, [product_id, quantity, order_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add product ${product_id} to order ${order_id}. Error ${error}`);
    }
  }
}
