# Express User Authentication and Profile Management

This is a simple Express.js application that provides user authentication and profile management functionalities. It allows users to register, login, and view their profile information securely.

## Features

- User registration with validation for name, phone number, email, and password.
- User login with JWT-based authentication.
- Password hashing using bcrypt for enhanced security.
- Protected route for fetching user profile, accessible only with a valid JWT token.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm
- PostgreSQL database

## Database Credentials

username = nodedemouser
password = demo
database = nodedemodb
host = localhost
dialect = postgres

Replace `nodedemouser` with your PostgreSQL username, `demo` with your password, and `nodedemodb` with the name of your database.

## Getting Started

1. Clone the repository:

git clone https://github.com/your-username/express-auth-profile.git


2. Navigate to the project directory:

cd phone-calls-spam


3. Install dependencies:

npm install


4. Set up environment variables:

Create a `.env` file in the root directory and provide the following variables:

NODE_ENV = 'development


5. Run migrations:

npx sequelize-cli db:migrate


6. Start the server:

npm run dev


7. The server should now be running on http://localhost:3000.

## API Endpoints

- **POST /register**: Register a new user. Requires name, phoneNumber, email, and password in the request body.
- **POST /login**: Authenticate user and generate JWT token. Requires phoneNumber and password in the request body.
- **GET /profile**: Fetch user profile. Requires a valid JWT token in the Authorization header.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
