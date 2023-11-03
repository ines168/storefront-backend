// @ts-ignore
import Client from "../database";
import { Order } from "../models/order";

export class DashboardQueries {
  async productsByCategory(category: string): Promise<{ name: string; price: number }[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT name, price FROM products WHERE category=($1);`;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something went wrong, ${error}`);
    }
  }

  async fiveMostPopular(): Promise<{ id: number }[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT products.id, name, COUNT(*) FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY count DESC LIMIT 5;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something went wrong, ${error}`);
    }
  }

  async completedOrdersByUser(id: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE status='closed' AND user_id=($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something went wrong. Error: ${error}`);
    }
  }

  async currentOrder(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) and status='active';`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[result.rows.length - 1];
    } catch (error) {
      throw new Error(`Something went wrong, ${error}`);
    }
  }
}
