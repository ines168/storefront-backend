import { Pool } from "pg";
import "dotenv/config";

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } = process.env;

let client;
console.log(ENV);

if (ENV === "test") {
  client = new Pool({
    database: POSTGRES_TEST_DB,
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5432,
  });
}

if (ENV === "dev") {
  client = new Pool({
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5432,
  });
}
export default client;
