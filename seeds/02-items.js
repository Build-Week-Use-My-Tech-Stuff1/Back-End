
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          "name": "Computer",
          "description": "computer spec stuff bla bla bla",
          "condition": "like new",
          "price": 15.75,
          "period": 10,
          "ownerId": 1,
          "renterId": null
        },
        {
          "name": "Laptop",
          "description": "MacBook",
          "condition": "Open Box",
          "price": 25,
          "period": 4,
          "ownerId": 2,
          "renterId": 1
        },
        {
          "name": "Monitor",
          "description": "27 Inch 144Hz 1080p LG Monitor",
          "condition": "Users",
          "price": 27,
          "period": 24,
          "ownerId": 3,
          "renterId": 2
        }
      ]);
    });
};
