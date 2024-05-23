# Project Documentation

## Overview

This project is a backend server application built with Express.js and Prisma. It uses PostGreSQL as the database and is written in TypeScript. The application provides APIs for user, product, and update management.

## Setup

To set up the project, you need to have Node.js and npm installed. After cloning the repository, run `npm install` to install the dependencies.

Run `npm run dev` to start the server in development mode. The server will be available at `http://localhost:3000`.

## Environment Variables

The project uses an environment variable for the database connection. The variables are `DATABASE_URL`, which should be set to the connection string of your SQL database. and `JWT_SECRET`, which should be set to a secret key for generating JSON Web Tokens(It could be anything. Any random string should do).

## Database Schema

The database schema is defined in `prisma/schema.prisma`. It consists of four models:

- `User`: Represents a user in the system. Each user has a unique username and a password.
- `Product`: Represents a product. Each product belongs to a user and has multiple updates.
- `Update`: Represents an update to a product. Each update has multiple update points.
- `UpdatePoint`: Represents a point in an update.

## API Endpoints

The server provides the following API endpoints:

- `GET /`: Returns a greeting message.
- `POST /user`: Creates a new user. The request body should contain `username` and `password`.
- `POST /signin`: Authenticates a user. The request body should contain `username` and `password`.
- `GET /api`: Protected route that requires authentication.

- `ALL ROUTES AFTER THIS POINT REQUIRE AUTHENTICATION`:

- `GET /product`: Returns all products.
- `GET /product/:id`: Returns a specific product.
- `PUT /product/:id`: Updates a specific product.
- `POST /product`: Creates a new product.
- `DELETE /product/:id`: Deletes a specific product.
- `GET /update`: Returns all updates.
- `GET /update/:id`: Returns a specific update.
- `PUT /update/:id`: Updates a specific update.
- `POST /update`: Creates a new update.
- `DELETE /update/:id`: Deletes a specific update.

## Middleware

The server uses several middleware:

- `cors`: For handling Cross-Origin Resource Sharing.
- `morgan`: For logging HTTP requests.
- `express.json()`: For parsing JSON request bodies.
- `express.urlencoded()`: For parsing URL-encoded request bodies.
- `protect`: For protecting routes that require authentication.

## Authentication

The server uses JSON Web Tokens (JWT) for authentication. The `protect` middleware checks the `Authorization` header of the request for a valid JWT. The `createNewUser` and `signin` functions create a JWT for the user.

## Error Handling

The server has a global error handler that handles different types of errors:

- `auth`: Returns a 401 status code with a message "unauthorized".
- `input`: Returns a 400 status code with a message "Invalid input".
- Other errors: Returns a 500 status code with a message "Oops that's on us".

## Deployment

This project is hosted on [Render](https://changelog-api-x2yq.onrender.com/).

