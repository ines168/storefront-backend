// @ts-ignore
import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async create(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;`;
      const result = await conn.query(sql, [product.name, product.price, product.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not create the product ${product.name}. Error: ${error}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM products;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not list all the products. Error: ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE id=($1);`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not show the product ${id}. Error: ${error}`);
    }
  }

  async edit(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *;`;
      const result = await conn.query(sql, [product.name, product.price, product.category, product.id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not edit the product ${product.name}. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `DELETE FROM products WHERE id=($1) RETURNING *;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete the product ${id}. Error: ${error}`);
    }
  }
}
