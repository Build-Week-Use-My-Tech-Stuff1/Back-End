const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../users/usersModel.js");
const { isValid } = require("../users/usersService.js");
// returns user info, token
router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                const token = makeJwt(user);

                res.status(201).json({ data: user[0], token });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});
// returns message, user info, token
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                console.log("user", user);
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({ message: "Welcome to our API", user, token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

function makeJwt(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
    };

    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;
