# RESTful API

### installation

```
$ npm install
$ npm run build
$ npm start
```

### register

```
POST http://localhost:3000/register

{
    "email": "test@tt.com",
    "password": "a12345",
    "name": "chanchai",
    "dateOfBirth": "2003-04-14",
    "gender": "male",
    "address": "123/223 bangkok 10120",
    "subscribeNewsletter": true
}
```

### login

```
POST http://localhost:3000/login

{
    "email": "test@tt.com",
    "password": "a12345"
}

response
{
    "token": "-- token --"
}
```

### get profile

```
GET http://localhost:3000/profile

Header
Authorization: token

response
{
    "email": "test@tt.com",
    "name": "chanchai",
    "age": "20 year(s) 10 month(s)",
    "gender": "male",
    "address": "123/223 bangkok 10120",
    "subscribeNewsletter": true
}
```

### patch profile

```
PATCH http://localhost:3000/profile

Header
Authorization: token

{
    "dateOfBirth": "2000-07-14", // optional
    "gender": "female", // optional
    "address": "333/211 bangkok 222", // optional
    "subscribeNewsletter": true // optional
}
```

### delete profile

```
DELETE http://localhost:3000/profile

Header
Authorization: token
```

### change password

After changing password , re-login is require.

```
PATCH http://localhost:3000/password

Header
Authorization: token

{
    "currentPassword": "a12345",
    "newPassword": "jsisiiw1"
}
```
