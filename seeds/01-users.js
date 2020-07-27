
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "username": "usertest",
          "password": "testpw",
          "firstName": "Simon",
          "lastName": "Huang"
        },
        {
          "username": "simontest",
          "password": "testpw",
          "firstName": "Name",
          "lastName": "Last"
        },
        {
          "username": "anotheruser",
          "password": "pwtest",
          "firstName": "First",
          "lastName": "Last"
      }
      ]);
    });
};
