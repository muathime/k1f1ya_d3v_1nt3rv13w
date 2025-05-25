# Kifiya Mini Wallet Mgt App - Frontend

This is the React + Vite frontend for the "Kifiya Mini Wallet Mgt" app. It connects to an Express.js backend for authentication and fetching data from the API.

---

## Features

- Login with email and password (returns a JWT)
- Protected routes (persisted via auth context)
- Toast notifications for feedback
- Built with Vite, React, TypeScript, Tailwind

---

## Run Locally

```
cd frontend
npm install
npm run dev
```

## Note: Make sure `.env` is set up

`VITE_API_URL=http://localhost:3000` //this is local backend

## Running Tests

`npm run test` //Uses Vitest and React Testing Library

## Auth Demo Credentials

```
Create a user using
 POST {{baseUrl}}/register

 Sample payload 
{
    "username": "munyao@gmail.com",
    "password": "1234567"
}
```
