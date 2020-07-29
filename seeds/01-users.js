const bcryptjs = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "username": "usertest",
          "password": bcryptjs.hashSync("testpw", 8),
          "firstName": "Simon",
          "lastName": "Huang"
        },
        {
          "username": "simontest",
          "password": bcryptjs.hashSync("testpw", 8),
          "firstName": "Name",
          "lastName": "Last"
        },
        {
          "username": "anotheruser",
          "password": bcryptjs.hashSync("pwtest", 8),
          "firstName": "First",
          "lastName": "Last"
      }
      ]);
    });
};
