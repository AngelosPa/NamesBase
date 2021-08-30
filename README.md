to run my application :

- npm init -y
- npm i express
- npm i dotenv
- npm i morgan
- npm i mongoose
- npm i nodemon --save-dev

- json script
  "start": "nodemon server.js"
  \*/

# Rest API

I Created a Express server that handles:

- A `GET` request endpoint at `/` as a landing page for your API.
- A `GET` request endpoint at `/user` to display all users in DB.
- A `POST` request endpoint at `/user` to add new user to DB.
- A `PUT` request endpoint at `/user/:name` to update user from DB upon their name.
- A `PATCH` request endpoint at `/user/:name` to update some user data from DB upon their name.
- A `GET` request endpoint at `/display/:name` to display one user from DB upon their name.

New user endpoint should be able to accept a JSON object like the following:

```json
{
  "userName": "steel",
  "userPass": "123pass",
  "age": "32",
  "fbw": "48",
  "toolStack": ["Js", "Html5", "Css3", "Sass"],
  "email": "contact@steel.eu"
}
```

## For the endpoint `/user` that adds new user

- I Created a middleware method that will make sure the object received contains `userName`, `userPass`, `age`, `fbw` and `email`.
- I Created a middleware method that will check if the user is above 18 years old
- I Created a middleware method that will check if the user belongs to our FBW
- If all the above is true, then you should get a response with a success message
- If any of the middleware fails, you should get a response with an error message that says why the user is not valid.

#### EXAMPLE RESPONSES

```json
// Success case
{
  "message" : "This user is valid!"
}


// Failure
{
  "message": "We can not validate your user. They are not a member of FBW48"
}


// Other case of Failure
{
  "message": "We can not validate your user. we don't accept pp that are below 18 years of age"
}

```

## For the `/display/:name` endpoint:

- I Created a middleware that makes the `firstName` starts with a capital letter.
- I Created a middleware that sorts the `toolStack` array alphabetically.
- I Created a middleware that will turn `age` and `fbw` to numbers.

#### EXAMPLE RESPONSES

```json
{
  "userName": "Steel",
  "userPass": "123pass",
  "age": 32,
  "fbw": 48,
  "toolStack": ["Css3", "Html5", "Js", "Sass"],
  "email": "contact@steel.eu"
}
```
