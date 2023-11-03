# Storefront Backend Project

This repo contains a basic Node and Express app for Storefront Backend API.

## Required Technologies

This application uses the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- supertest for testing endpoints
- bcrypt from npm for hashing passwords

## Getting Started

The database schema and and API route information can be found in the REQUIREMENTS.md.
App runs on port 3000. Database runs on port 5432;

### Set the app and databases

- Clone the repository
- Run `npm install` to install all the dependencies required for the project
- Create 2 databases in your postgres SQL Shell, 1 for development `CREATE DATABASE storedb;`, 1 for testing. `CREATE DATABASE storedb_test;`
- Add an .env file with environment variables
- Run the database migrations `db-migrate up`

### Test the app

- `npm run test` - unit testing with Jasmine
  NOTE: It is not necessary to run `db-migrate up` at the command line as the script contains the necessary call to operation.

### Run the app

- `npm run build` - to compile TS
- `npm run start` - to compile TS and run app

## Environment Variables

- POSTGRES_HOST=localhost
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=password123
- POSTGRES_DB=storedb
- POSTGRES_TEST_DB=storedb_test
- ENV=dev
- BCRYPT_PASSWORD=mnbvc
- SALT_ROUNDS=10
- TOKEN_SECRET=asdfg
