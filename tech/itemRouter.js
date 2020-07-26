const express = require('express');
const Items = require('./itemModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    Items.getAll()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.get('/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ error: 'item could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.put('/:id', (req, res) => {
    Items.findById(req.params.id)
        .then(item => {
            if (item) {
                Items.update(req.body, req.params.id)
                    .then(changed => {
                        res.status(200).json(changed);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'item could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.delete('/:id', (req, res) => [
    Items.findById(req.params.id)
        .then(item => {
            if (item) {
                Items.remove(req.params.id)
                    .then(removed => {
                        res.status(200).json({ remove: removed })
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            } else {
                res.status(404).json({ error: 'item could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
])

module.exports = router;