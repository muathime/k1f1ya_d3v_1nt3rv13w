# 🐘 Kifiya Mini Wallet Mgt App - Backend

This is the Express.js backend for the "Kifiya Mini Wallet Mgt" app. It handles authentication and acts as a proxy to the simulated mock API.

## Features
- Simple JWT middleware
- Built-in logger for requests

## Tech Stack

- Express.js
- JWT (jsonwebtoken)
- Axios
- CORS

## Run Locally

```bash
cd backend
npm install
npm run dev //runs with nodemon for hot reload for dEv
```

## Note Make sure `.env` is set up

```
JWT_SECRET=kif1y@
PORT=3000
```

## Running Tests

`npm run test` //uses jest

## Auth Demo Credentials (supply from frontend or test via an api client e.g. Postman)

```
Create a user using
 POST {{baseUrl}}/register

 Sample payload
{
    "username": "munyao@gmail.com",
    "password": "1234567"
}
```

## Example queries to create tables.

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  date_of_birth DATE,
  id_number TEXT,
  phone_number TEXT,
  isKYCCompleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type TEXT NOT NULL CHECK (type IN ('Cash In', 'Cash Out')),
  amount NUMERIC(10, 2),
  metadata JSONB
);

Another option is to use a tool like nex to manage migrations
```
