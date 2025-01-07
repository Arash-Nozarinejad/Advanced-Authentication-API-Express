# Summary of the Advanced Login API

This API is an enhanced version of a user authentication system with added functionalities for request validation and rate limiting. It includes the following:

## Functionality

### User Registration (POST `/api/auth/register`)
- Accepts `email`, `password`, and optional `name` from the request body.
- Validates the request using `express-validator` to ensure:
  - `email` is in a valid format.
  - `password` is at least 6 characters long.
  - `name` (if provided) is at least 2 characters long.
- Checks if a user with the provided email already exists in the database.
- Hashes the password using `bcrypt`.
- Creates a new user in the database using Prisma.
- Returns a JWT token generated using `jsonwebtoken` and the user’s data.

### User Login (POST `/api/auth/login`)
- Accepts `email` and `password` from the request body.
- Validates the request using `express-validator` to ensure:
  - `email` is in a valid format.
  - `password` exists.
- Checks if a user with the provided email exists in the database.
- Verifies the password against the hashed password using `bcrypt`.
- Generates a JWT token using `jsonwebtoken`.
- Returns the token and the authenticated user’s data.
- Protected by a rate limiter to allow only 5 login attempts per 15 minutes.

### Authenticated User Information (GET `/api/auth/me`)
- Protected route requiring a valid JWT token in the `Authorization` header.
- Decodes and verifies the token using `jsonwebtoken`.
- Fetches the user data from the database using Prisma.
- Returns the authenticated user’s information.

### Global Rate Limiting
- Limits 100 requests per hour per client IP to the entire API.
- Ensures fair usage and prevents abuse (e.g., DDoS attacks).

## Tools and Technologies Used

### Node.js and Express.js
- Framework for handling HTTP requests and routing.

### Prisma ORM
- Used for database interactions, including creating and querying users.

### bcrypt
- For hashing passwords during registration and verifying them during login.

### jsonwebtoken (JWT)
- For generating, signing, and verifying tokens to handle user authentication.

### dotenv
- For securely managing environment variables such as `DATABASE_URL` and `JWT_SECRET`.

### express-validator
- Middleware for request validation.
- Ensures incoming data meets the required format and structure.

### express-rate-limit
- Middleware for rate limiting.
- Protects the login route (`POST /api/auth/login`) from brute-force attacks and enforces global rate limits.

### Supertest (Testing)
- For making HTTP requests to the API endpoints during tests.

### Jest (Testing)
- For writing and running test cases.

### PostgreSQL
- The database used to store user information.

### TypeScript
- For static typing and defining interfaces for request and response payloads.

### Express Middleware
- Custom middleware for:
  - **Token Authentication**: Verifies the validity of JWT tokens for protected routes.
  - **Error Handling**: Logs and returns a generic `500 Internal Server Error` response for unhandled errors.
  - **Validation Middleware**: Processes validation rules defined using `express-validator`.

## High-Level Steps to Recreate the API

### Initialize the Project
1. Set up a Node.js project with `npm init -y`.
2. Install required dependencies: `express`, `prisma`, `bcrypt`, `jsonwebtoken`, `express-validator`, `express-rate-limit`, etc.

### Set Up Prisma
1. Configure the database connection in `prisma/schema.prisma`.
2. Define the `User` model and run `npx prisma migrate` to create the database schema.

### Create Middleware
- **Authentication Middleware**:
  - Verifies and decodes JWT tokens.
- **Validation Middleware**:
  - Runs validation rules and returns errors for invalid requests.
- **Error Handling Middleware**:
  - Logs and handles uncaught exceptions.
- **Rate Limiting Middleware**:
  - Implements global and route-specific rate limits using `express-rate-limit`.

### Define Validation Rules
- Create reusable validation rules for registration and login requests using `express-validator`.

### Develop Controllers
- **Register Controller**:
  - Validates input, hashes passwords, creates users, and returns JWT tokens.
- **Login Controller**:
  - Validates input, verifies credentials, and returns JWT tokens.

### Define Routes
- Create routes for:
  - **Registration**: Protected by validation middleware.
  - **Login**: Protected by validation and rate limiting middleware.
  - **Authenticated User Information**: Protected by authentication middleware.

### Apply Global Rate Limiting
- Use `express-rate-limit` to enforce a general limit on all API endpoints.

### Testing
- Write tests using `jest` and `supertest` for all routes.
- Cover valid and invalid inputs, duplicate users, token verification, and rate limit enforcement.

### Start the Server
- Set up Express with CORS, JSON parsing, routes, and error handling.
- Start the server on a specified port.
