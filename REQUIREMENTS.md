# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (GET `/products`)
- Show (GET `/products/:id`)
- Create [token required] (POST `/products`)
- Edit [tokren required] (PUT `/products/:id`)
- Delete [tokren required] (DELETE `/products/:id`)
- [OPTIONAL] Top 5 most popular products (GET `/five-most-popular`)
- [OPTIONAL] Products by category (GET `/products/category/:category`)

| Method      | HTTP verb | Endpoint                       | Params   | Body                    |  Token  |
| ----------- | --------- | ------------------------------ | -------- | ----------------------- | :-----: |
| Index       | GET       | `/products`                    |          |                         |         |
| Show        | GET       | `/products/:id`                | id       |                         |         |
| Create      | POST      | `/products`                    |          | name, price, [category] | &check; |
| Edit        | PUT       | `/products/:id`                | id       | name, price, [category] | &check; |
| Delete      | DELETE    | `/products/:id`                | id       |                         | &check; |
| Top 5       | GET       | `/five-most-popular`           |          |                         |         |
| By Category | GET       | `/products/category/:category` | category |                         |         |

#### Users

- Index (GET `/users`)
- Show (GET `/users/:id`)
- Create (POST `/users`)
- Edit [token required] (PUT `/users/:id`)
- Delete [token required] (DELETE `/users/:id`)

| Method | HTTP verb | Endpoint     | Params | Body                                   |  Token  |
| ------ | --------- | ------------ | ------ | -------------------------------------- | :-----: |
| Index  | GET       | `/users`     |        |                                        |         |
| Show   | GET       | `/users/:id` | id     |                                        |         |
| Create | POST      | `/users`     |        | first_name, last_name, hashed_password |         |
| Edit   | PUT       | `/users/:id` | id     | first_name, last_name, hashed_password | &check; |
| Delete | DELETE    | `/users/:id` | id     |                                        | &check; |

#### Orders

- Index (GET `/orders`)
- Show (GET `/orders/:id`)
- Create (POST `/orders`)
- Edit (PUT `/orders/:id`)
- Delete (DELETE `/orders/:id`)
- Current Order by user (GET `/orders/:id/:status`)
- [OPTIONAL] Completed Orders by user (GET `/completed-orders/:id`)
- Add product to order( POST `/orders/:id/product`);

| Method           | HTTP verb | Endpoint                | Params     | Body                 |  Token  |
| ---------------- | --------- | ----------------------- | ---------- | -------------------- | :-----: |
| Index            | GET       | `/orders`               |            |                      | &check; |
| Show             | GET       | `/orders/:id`           | id         |                      | &check; |
| Create           | POST      | `/orders`               |            | status, user_id      |         |
| Edit             | PUT       | `/orders/:id`           | id         | status, user_id      | &check; |
| Delete           | DELETE    | `/orders/:id`           | id         |                      | &check; |
| Current order    | GET       | `/orders/:id/:status`   | id, status |                      | &check; |
| Completed orders | GET       | `/completed-orders/:id` | id         |                      | &check; |
| Add product      | POST      | `/orders/:id/product`   | id         | product_id, quantity |         |

## Data Shapes

#### Product

- id : SERIAL PRIMARY KEY
- name : VARCHAR
- price : INTEGER
- [OPTIONAL] category : VARCHAR

products table:
| id | name | price | category |
|:------------------:|:-------:|:-------:|:----------:|
| SERIAL PRIMARY KEY | VARCHAR | INTEGER | VARCHAR |
| | | | |

#### User

- id : SERIAL PRIMARY KEY
- first_name : VARCHAR
- last_name : VARCHAR
- hashed_password : VARCHAR

users table:
| id | first_name | last_name | hashed_password |
|:------------------:|:----------:|:---------:|:---------------:|
| SERIAL PRIMARY KEY | VARCHAR | VARCHAR | VARCHAR |

#### Orders

- id : SERIAL PRIMARY KEY
- status : VARCHAR
- user_id : INTEGER (foreign key to users table)

orders table:
| id | status | user_id |
|:------------------:|:-------:|:-------:|
| SERIAL PRIMARY KEY | VARCHAR | INTEGER |

#### Order_products

- id : SERIAL PRIMARY KEY
- product_id : INTEGER (foreign key to products table)
- quantity : INTEGER
- user_id : INTEGER (foreign key to users table)

order_products table:
| id | product_id | quantity | user_id |
|:------------------:|:----------:|:--------:|:-------:|
| SERIAL PRIMARY KEY | INTEGER | INTEGER | INTEGER |
