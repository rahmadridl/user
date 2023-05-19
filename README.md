# Project Users

Project for register, login, and read list user.

## Installation

1. Run `npm install` to install dependencies.
2. Create a `.env` file based on the `.env_example` file and provide the required environment variables.
3. Import the database schema and data from the `database` folder.
4. Run `npm run dev` to start the development server.

## Usage

### Register

Endpoint: `localhost:3000/auth/signup`
Method: POST
Request Body:
```json
{
  "username": "",
  "password": "",
  "fullname": ""
}
```

### Login

Endpoint: `localhost:3000/auth/login`
Method: POST
Request Body:
```json
{
  "username": "admin",
  "password": "admin"
}
```

### Read User List

Endpoint: `localhost:3000/user/userlist`
Method: GET
Query Parameters:
- `page`: page number
- `page_size`: number of users per page
Headers:
- `Authorization`: Bearer token

Note: Make sure to include the token received from the login response in the `Authorization` header.