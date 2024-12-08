# API Documentation

## POST `/users/register`

### Description

Register a new user account.

### Request Headers

- `Content-Type: application/json`

### Request Body Parameters

- `email` (string, required): User's email address.
- `password` (string, required): Password (minimum 6 characters).
- `fullname.firstname` (string, required): First name (minimum 3 characters).
- `fullname.lastname` (string, optional): Last name.

**Example Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secret123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
{
  "token": "your_jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}