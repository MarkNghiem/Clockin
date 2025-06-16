# API TEMPLATE
## Description
This markdown contains info of API Endpoints of Clockin'
## Base URL
`https://localhost:3000/`
## List of Endpoints
- [POST /signin](#post-signin) 
- [POST /signup](#post-signup)
### POST /signin
- Request Parameters: `n/a`
- Request Headers: 
```
{
  "Content-Type: "application/json",
}
```
- Request body:
```
{
  "email": "johndoe123@email.com"
  "password": "HelloWorld",
}
```
- Response:
```
{
  "message": "Successfully Logged In",
  "data": {
    "firstName": "John",

  }
}
```
- Response Codes:
```
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```
### POST /signup
- Request Parameters:
```
employee_id: "string" (Employee ID is stored beforehand in a DB)
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```

- Request body:
```
{
  "firstName": "John" (Prefilled),
  "lastName": "Doe" (Prefilled),
  "email": "johndoe123@email.com",
  "password": "HelloWorld",
}
```
- Response: A pop up that stated a new account has been successfully created

- Response Codes:
```
200 Success
400 Bad Request
404 Not Found
500 Internal Server Error
```
### GET /dashboard
- Request Parameters:
```
employee_id: "string" (Retrieve from token)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
}
```