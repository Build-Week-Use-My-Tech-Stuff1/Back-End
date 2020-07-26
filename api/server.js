const express = require('express');
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/authRouter.js");
const usersRouter = require("../users/usersRouter.js");
const itemsRouter = require("../tech/itemRouter.js");
const restricted = require("../auth/restrictedMiddleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/items", restricted, itemsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Server is running</h2>')
})

module.exports = server;