CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id int REFERENCES users(id)    
);