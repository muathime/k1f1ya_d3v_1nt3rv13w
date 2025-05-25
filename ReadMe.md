# Fullstack Mini Wallet App (Frontend + Backend)

This project contains a fullstack application with both frontend and backend in this same repo.

## Quick Start with Docker

To run the entire app using Docker

```
docker compose up --build
```

This will start both the frontend (on http://localhost:5173) and the backend (on http://localhost:3000).

#### Required > create a test user via an api client e.g. Postman (after running docker compose up --build)

```
Create a user using
 POST localhost/register

 Sample payload
{
    "username": "munyao@gmail.com",
    "password": "1234567"
}
```

## Running Without Docker

If you prefer running individually without containerization

Refer to

```
1. `frontend/README.md` for local frontend setup
2. `backend/README.md` for local backend setup
```
