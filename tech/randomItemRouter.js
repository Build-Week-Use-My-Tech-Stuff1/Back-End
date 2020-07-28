const express = require('express');
const Items = require('./itemModel.js');
const router = express.Router();

let rand;

Items.getAll()
    .then(items => {
        rand = items[Math.floor(Math.random() * items.length)];
    })
    .catch(err => {
        res.status(500).json(err);
    });

setInterval(function () {
    Items.getAll()
        .then(items => {
            rand = items[Math.floor(Math.random() * items.length)];
        })
        .catch(err => {
            res.status(500).json(err);
        })
}, 86400000)

router.get('/', (req, res) => {
    res.status(200).json(rand);
})

module.exports = router;