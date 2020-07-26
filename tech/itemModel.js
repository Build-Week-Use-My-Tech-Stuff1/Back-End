const db = require('../database/dbConfig.js');

module.exports = {
    getAll,
    findById,
    add,
    remove,
    update, 
    getRentedItems,
    getOwnedItems
};
// all items
function getAll() {
    return db('items');
}
// individual item by id
function findById(id) {
    return db('items').where({ id });
}
// add item
async function add(item) {
    const [id] = await db('items').insert(item);

    return findById(id);
}
// remove item
async function remove(id) {
    const temp = await db('items').where({ id }).first();
    if (temp) {
        const del = await db('items').where({ id }).del();
        if (del === 1) {
            return temp;
        }
    }
}
// update item
function update(changes, id) {
    return db('items').where({ id }).update(changes)
        .then(() => {
            return findById(id);
        })
}
// returns all owned items by given owner id
function getOwnedItems(id) {
    return db('users')
        .join('items', 'users.id', '=', 'items.ownerId')
        .where('ownerId', id);
}
// returns all rented items by the renter id
function getRentedItems(id) {
    return db('users')
        .join('items', 'users.id', '=', 'items.renterId')
        .where('renterId', id);
}