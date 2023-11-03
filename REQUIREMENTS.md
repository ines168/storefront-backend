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

#### Users

- Index (GET `/users`)
- Show (GET `/users/:id`)
- Create (POST `/users`)
- Edit [token required] (PUT `/users/:id`)
- Delete [token required] (DELETE `/users/:id`)

#### Orders

- Index (GET `/orders`)
- Show (GET `/orders/:id`)
- Create (POST `/orders`)
- Edit (PUT `/orders/:id`)
- Delete (DELETE `/orders/:id`)
- Current Order by user (GET `/orders/:id/:status`)
- [OPTIONAL] Completed Orders by user (GET `/completed-orders/:id`)

## Data Shapes

#### Product

- id : SERIAL PRIMARY KEY
- name : VARCHAR
- price : INTEGER
- [OPTIONAL] category : VARCHAR

#### User

- id : SERIAL PRIMARY KEY
- first_name : VARCHAR
- last_name : VARCHAR
- hashed_password : VARCHAR

#### Orders

- id : SERIAL PRIMARY KEY
- status : VARCHAR
- user_id : INTEGER (foreign key to users table)

#### Order_products

- id : SERIAL PRIMARY KEY
- product_id : INTEGER (foreign key to products table)
- quantity : INTEGER
- user_id : INTEGER (foreign key to users table)
