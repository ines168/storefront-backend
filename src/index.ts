import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import user_routes from "./handlers/users";
import product_routes from "./handlers/products";
import order_routes from "./handlers/orders";
import dashboard_routes from "./handlers/dashboards";
import cors from "cors";

const app: express.Application = express();
const address: string = "0.0.0.0.3000";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

user_routes(app);
product_routes(app);
order_routes(app);
dashboard_routes(app);

app.listen(3000, () => {
  console.log(`Listening on port: ${address}`);
});

export default app;
