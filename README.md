
# Nest.js Booking | Test task

CRUD-operations with Nest.js using Sequelize ORM and PostqrSQL

# Use NPM or YARN to install packages

`` npm i ``

`` yarn ``
## Environment Variables Example

To run this project, you will need to add the following environment variables to your .env file

`PORT` PORT NUMBER

`DATABASE_URL`postgresql://name:passwird@localhost:5432/databasename

`DATABASE_DIALECT` postgres

`NODE_ENV` development
## Setup config json file

``
{
"development": {
"username": "name",
"password": "password",
"database": "databasename",
"host": "127.0.0.1",
"dialect": "postgres"
}
}``


# Migration

Run `` npm run migrate `` or `` yarn migrate `` to apply migration 

