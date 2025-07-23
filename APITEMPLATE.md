# API TEMPLATE

## Description

This markdown contains info of API Endpoints of Clockin'

## Base URL

`https://localhost:3000/`

## List of Endpoints

-   [GET /](#get)
-   [GET /welcome/:uid](#get-welcomeuid)
-   [GET /:uid](#get-uid)
-   [GET /:uid/:cid](#get-uidcid)
-   [GET /:uid/dashboard/:cid](#get-uiddashboardcid)
-   [POST /signup](#post-signup)
-   [POST /signup/:eid/:cid](#post-signupeidcid)
-   [POST /login](#post-login)
-   [POST /welcome/:uid](#post-welcomeuid)
-   [POST /:uid/:cid/edit](#post-uidcidedit)
-   [POST /logout](#post-logout)
-   [PATCH /:uid/:cid/edit](#patch-uidcidedit)

## Format

> ## _METHOD /route1/route2/..._
>
> -   Request Parameters:
> -   Request Option:
> -   Request Header:
> -   Request Body:
> -   Response:
> -   Response Codes:

## _GET_

-   Request Parameters: `n/a`
-   Request Option: `n/a`
-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body: `n/a`
-   Response:

```json
{
	"message": "Welcome to Clockin'"
}
```

-   Response Codes:

```js
200 Success
400 Bad Request
404 Not Found
500 Internal Server Error
```

## _POST /signup_

-   Request Parameters: `n/a`
-   Request Option: `n/a`
-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body:

```json
{
	"employeeID": "string",
	"companyID": "string"
}
```

-   Response:

```json
{
  "message": "Data found with corresponding IDs"
  "data":
    {
      "companyName": "KN, LLC",
    }
}
```

-   Response Codes:

```js
200 Success
404 Not Found
500 Internal Server Error
```

## _POST /signup/:eid/:cid_

-   Request Parameters:

```js
eid: 'string' (employeeID);
cid: 'string' (companyID);
```

-   Request Option: `n/a`
-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body:

```json
{
	"firstName": "John",
	"lastName": "Doe",
	"userID": "JohnDoe123",
	"email": "JohnDoe123@email.com",
	"password": "HelloWorld"
}
```

-   Response:

```json
{
	"message": "Successfully created a new account"
}
```

-   Response Codes:

```js
201 Created
400 Bad Request
500 Internal Server Error
```

## _POST /login_

-   Request Parameters: `n/a`
-   Request Option: `n/a`
-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body:

```json
{
	"userID": "JohnDoe123",
	"password": "HelloWorld"
}
```

-   Response:

```json
{
  "message": "Successfully Logged In!",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "companyList": [
      {
        "companyName": "KN, LLC",
        "companyID": "string",
        "isFirstTime": boolean,
      },
      ...
    ],
    "token": "string",
    "isAdmin": boolean,
    "isFirstTime": boolean,
  }
}
```

-   Response Codes:

```js
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

## _GET /welcome/:uid_

-   Request Parameters:

```js
uid: 'JohnDoe123'(userID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body: `n/a`
-   Response:

```json
{
	"message": "First time user detected. Triggering additional set up steps..."
}
```

-   Response Codes:

```js
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

## _POST /welcome/:uid_

-   Request Parameters:

```js
uid: 'JohnDoe123'(userID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body:

```json
{
	"addressLine1": "123 N Alpha Ave",
	"addressLine2": "#A",
	"city": "Los Angeles",
	"state": "CA",
	"zip": "12345",
	"country": "USA",
	"countryCode": "+1",
	"phoneNumber": "1234567890"
}
```

-   Response:

```json
{
	"message": "Data successfully updated"
}
```

-   Response Codes:

```js
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

## _GET /:uid_

-   Request Parameters:

```js
uid: 'JohnDoe123'(userID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body: `n/a`
-   Response:

```json
{
	"message": "Prompting user to select a company..."
}
```

-   Response Codes:

```js
200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

## _GET /:uid/:cid_

-   Request Parameters:

```js
uid: 'string'(userID);
cid: 'string'(companyID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body: `n/a`
-   Response:

```json
{
	"message": "First time the company has been chosen. Triggering reviewing company data..."
}
```

-   Response Codes:

```js

200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error

```

## _GET /:uid/dashboard/:cid_

-   Request Parameters:

```js
uid: 'JohnDoe123'(userID);
cid: 'string'(companyID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body: `n/a`
-   Response:

```json

{
  "message": "Successfully retrieved data from ${companyName}",
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

-   Response Codes:

```js

200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error

```

## _POST /:uid/:cid/edit_

-   Request Parameters:

```js
uid: 'JohnDoe123'(userID);
cid: 'string'(companyID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body:

```json
{
	"password": "HelloWorld"
}
```

-   Response:

```json
{
	"message": "Password matched! Allowing user to edit info"
}
```

-   Response Codes:

```js

200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error

```

## _PATCH /:uid/:cid/edit_

-   Request Parameters:

```js
uid: 'JohnDoe123'(userID);
cid: 'string'(companyID);
```

-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body:

```json

{
"fieldThatNeedsToBeChanged": "updatedValue",
...
}

```

-   Response:

```json

{
  "message": "Successfully updated data",
  "data": {
    "fieldThatNeedsToBeChanged": "updatedValue",
    ...
  },
}

```

-   Response Codes:

```js

200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error

```

## _POST /logout_

-   Request Parameters: `n/a`
-   Request Option:

```js
credentials: 'include';
```

-   Request Header:

```json
{
	"Content-Type": "application/json"
}
```

-   Request Body: `n/a`
-   Response:

```json
{
	"message": "Successfully Logout"
}
```

-   Response Codes:

```js

200 Success
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error

```
