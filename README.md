# Practica_REST_AJV_TypeBox
# To use

First create DATABASE with rest_ajv_typebox.sql file.

# API Routes

GET / users - Get All Users

GET / users /id- Get Single User with the corresponded id

POST /users - Create New User

In body: {
  "name":"name",
  "email":"email@email.com",
  "pass":"password" 
}

PUT / users /id - Update Single User with the corresponded id

In body: {
  "name":"name",
  "email":"email@email.com",
  "pass":"password" 
}

PATCH / users /id - Update Single User.name with the corresponded id

In body: {
  "name":"name" 
}

DELETE / users /id - Delete Single User with the corresponded id

In body: {
  "pass":"password"
}

POST / login – Login

{
  "email":"email@email.com",
  "pass":"password"
}

GET / profile  - Profile

In Authorization the JSONWebToken from login

