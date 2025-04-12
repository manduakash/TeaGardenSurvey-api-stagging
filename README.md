# Author
Mr. Akash Singh

# Installation
command: `npm install`

# Run Project
command: `npm run dev`

# Project Structure
├── server.js           -> Entry point for the application
├── .env                -> Environment variables configuration
├── db.js               -> Database connection and configuration
├── package.json        -> Project metadata and dependencies
├── package-lock.json   -> Automatically generated lock file for dependencies
├── models/             -> Database models and schema definitions
├── controllers/        -> Contains the logic for handling requests and responses
├── routes/             -> API route definitions
├── middleware/         -> Custom middleware for request processing
├── utils/              -> Utility functions and helpers
├── logs/               -> Stores application logs (if logging is implemented)
├── .gitignore          -> Specifies files and directories to ignore in Git
└── README.md           -> Project documentation

### Description of Key Directories and Files

- **`server.js`**: 
The entry point of the application where the Express server is configured and started.

- **`.env`**: 
Stores environment-specific configuration (e.g., database credentials, API keys). Make sure to add this file to gitignore to avoid exposing sensitive information.

- **`db.js`**: 
Handles the database connection and configuration.

- **`package.json`**: 
Contains project metadata, scripts, and dependencies.

- **`package-lock.json`**: 
Automatically generated lock file for dependencies, ensuring consistent dependency versions across environments.

- **`models/`**: 
Defines the database schema and models using an ORM like Mongoose (for MongoDB) or Sequelize (for SQL databases).

- **`controllers/`**: Contains the logic for handling incoming requests and sending responses. Each controller typically corresponds to a specific resource or functionality.

- **`routes/`**: 
Defines the API endpoints and maps them to the appropriate controllers.

- **`middleware/`**: 
Custom middleware functions for tasks like authentication, validation, error handling, etc.

- **`utils/`**: 
Contains utility functions, helpers, or reusable code that can be used across the application.
  
- **`logs/`**: 
Stores application logs (if logging is enabled). Useful for debugging and monitoring.


---

================================
Authentication and Authorization
================================

### Overview
This API uses JSON Web Tokens (JWT) for authentication and authorization. Below is an explanation of how the system works:

###### Authentication Flow: ######

* Users send their username and password to the /login endpoint.

* The server validates the credentials and generates a JWT token if the credentials are correct.

* The token is stored in the database and sent back to the client for future authenticated requests.

# Token Generation:

* The JWT token is generated using a payload containing user-specific information (e.g., UserID, DistrictID, Username, etc.).

* The token is signed using a secret key and has an expiration time.

# Token Storage:

* The generated token is stored in the database and also sent to the client in the response.

* The client can store the token in cookies or local storage for future requests.

---------------------------------------------------------------------------------------------

###### Authorization Flow ######

# Token Verification:

* For protected routes, the client must include the JWT token in the Authorization header.

* The server verifies the token's validity and checks if it matches the token stored in the database.

* If the token is valid, the request is allowed to proceed; otherwise, an error is returned.

# Middleware:

* The verifyToken middleware is used to validate the token for every protected route.

* If the token is expired or invalid, the middleware returns a 401 Unauthorized response.

================================
Encryption & Decryption Methods
================================

The project leverages the built-in **crypto** package in Node.js to implement **AES-256-CBC** encryption for securing sensitive data. A `32-byte` secret key and a `16-byte` initialization vector (IV), stored in environment variables, are used for encryption and decryption. This encryption mechanism is also utilized to encrypt `JWT tokens`, adding an extra layer of security to ensure data confidentiality and integrity across the application. The `encryptAES` and `decryptAES` functions handle the encryption and decryption processes, with built-in error handling for reliability.
