# API TEMPLATE

## Description
This markdown contains info of API Endpoints of Clockin'

## Base URL
`https://localhost:3000/`

## List of Endpoints
- [GET /](#get) 
- [GET /welcome/:uid](#get-welcomeuid)
- [GET /:uid](#get-uid)
- [GET /:uid-cid](#get-uid-cid)
- [GET /:uid/dashboard/:cid](#get-uiddashboardcid)
- [POST /signup](#post-signup)
- [POST /signup/:eid-cid](#post-signupeid-cid)
- [POST /login](#post-login)
- [POST /welcome/:uid](#post-welcomeuid)
- [POST /:uid/:cid/edit](#post-uidcidedit)
- [POST /logout](#post-logout)
- [PATCH /:uid/:cid/edit](#patch-uidcidedit)

## Format
> ## *METHOD /route1/route2/...*
> - Request Parameters:
> - Request Option:
> - Request Header:
> - Request Body:
> - Response:
> - Response Codes:

## *GET*
- Request Parameters: `n/a`
- Request Option: `n/a`
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body: `n/a`
- Response:
```
{
  "message": "Welcome to Clockin'",
}
```
- Response Codes:
```
200 Success
400 Bad Request
404 Not Found
500 Internal Server Error
```

## *POST /signup*
- Request Parameters: `n/a`
- Request Option: `n/a`
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body:
```
{
  "employeeID": "string",
  "companyID": "string",
}
```
- Response:
```
{
  "message": "Data found with corresponding IDs"
  "data": {
    "companyName": "KN, LLC",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```
- Response Codes:
```
200 Success
400 Bad Request
404 Not Found
500 Internal Server Error
```

## *POST /signup/:eid-cid*
- Request Parameters:
```
eid-cid: "string" (employeeID-companyID)
```
- Request Option: `n/a`
- Request Header:
```
{
  "Content-Type": "application/json"
}
```
- Request Body:
```
{
  "userID": "JohnDoe123"
  "email": "JohnDoe123@email.com",
  "password": "HelloWorld",
}
```
- Response:
```
{
  "message": "Successfully created a new account",
}
```
- Response Codes:
```
200 Success
400 Bad Request
404 Not Found
500 Internal Server Error
```
## *POST /login*
- Request Parameters: `n/a`
- Request Option: `n/a`
- Request Header:
```
{
  "Content-Type": "application/json"
}
```
- Request Body:
```
{
  "userID": "JohnDoe123",
  "password": "HelloWorld",
}
```
- Response:
```
{
  "message": "Successfully Logged In!",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "companyList": [
      {
        companyName: "KN, LLC",
        conpanyID: "string",
        isFirstTime: boolean,
      },
      ...
    ],
    "token": "string",
    "isAdmin": boolean,
    "isFirstTime": boolean,
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

## *GET /welcome/:uid*
- Request Parameters:
```
uid: "JohnDoe123" (userID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body: `n/a`
- Response:
```
{
  "message": "First time user detected. Triggering additional set up steps..."
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

## *POST /welcome/:uid*
- Request Parameters:
```
uid: "JohnDoe123" (userID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body:
```
{
  "addressLine1": "123 N Alpha Ave",
  "addressLine2": "#A",
  "city": "Los Angeles",
  "state": "CA",
  "zip": "12345",
  "country": "USA",
  "countryCode": "+1",
  "phoneNumber": "1234567890",
}
```
- Response:
{
  "message": "Data successfully updated"
}
- Response Codes:
```
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

## *GET /:uid*
- Request Parameters:
```
uid: "JohnDoe123" (userID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body: `n/a`
- Response:
{
  "message": "Prompting user to select a company..."
}
- Response Codes:
```
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```
## *GET /:uid-cid*
- Request Parameters:
```
uid-cid: "string" (userID-companyID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body: `n/a`
- Response:
```
{
  "message": "First time the company has been chosen. Triggering reviewing company data..."
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

## *GET /:uid/dashboard/:cid*
- Request Parameters:
```
uid: "JohnDoe123" (userID)
cid: "string" (companyID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body: `n/a`
- Response:
```
{
  "message": `Successfully retrieved data from ${companyName}`,
  "data": {
    "personal": {
      "dateOfBirth": "01021990",
      "last4SSN": "1234",
      "addressLine1": "123 N Alpha Ave",
      "addressLine2": "#A",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "12345",
      "country": "USA",
      "employeeID": "string",
      "title": "Owner",
      "wage": "$100/hr",
    },
    "team": [
      {
        "firstName": "Jane",
        "lastName": "Doe",
        "title": "CTO",
      },
      ...
    ],
  },
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
## *POST /:uid/:cid/edit*
- Request Parameters:
```
uid: "JohnDoe123" (userID)
cid: "string" (companyID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body:
```
{
  "password": "HelloWorld",
}
```
- Response:
```
{
  "message": "Password matched! Allowing user to edit info"
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

## *PATCH /:uid/:cid/edit*
- Request Parameters:
```
uid: "JohnDoe123" (userID)
cid: "string" (companyID)
```
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body:
```
{
  "fieldThatNeedsToBeChanged": "updatedValue",
  ...
}
```
- Response:
```
{
  "message": "Successfully updated data"
  "data": {
    "fieldThatNeedsToBeChanged": "updatedValue",
    ...
  },
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

## *POST /logout*
- Request Parameters: `n/a`
- Request Option:
```
credentials: "include"
```
- Request Header:
```
{
  "Content-Type": "application/json",
}
```
- Request Body: `n/a`
- Response:
```
{
  "message": "Successfully Logout"
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