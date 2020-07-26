const router = require('express').Router();
const Users = require('./usersModel.js');
const Items = require('../tech/itemModel.js');

// returns all users -- works
router.get("/", (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// returns user of given id -- works
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'user could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// get owned items by id owner
router.get('/:id/owned', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Items.getOwnedItems(req.params.id)
                    .then(items => {
                        res.status(200).json(items);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({error: 'user could not be found'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// get rented items by id
router.get('/:id/rented', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Items.getRentedItems(req.params.id)
                    .then(items => {
                        res.status(200).json(items);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({error: 'user could not be found'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// post an item
router.post('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Items.add({ ...req.body, ownerId: req.params.id })
                    .then(item => {
                        res.status(201).json(item);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'user could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// return updated user info
router.put('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Users.update(req.body, req.params.id)
                    .then(changed => {
                        res.status(200).json(changed);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'user could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// return removed user info
router.delete('/:id', (req, res) => [
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Users.remove(req.params.id)
                    .then(removed => {
                        res.status(200).json({ remove: removed })
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'user could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
])

module.exports = router;