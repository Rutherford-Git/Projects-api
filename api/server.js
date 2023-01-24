const express = require("express");
const server = express();

const actions = require("./actions/actions-router");
const projects = require("./projects/projects-router");
server.use(express.json());

server.use("/api/actions", actions);
server.use("/api/projects", projects);

server.use(
    express.json("*", (req, res) => {
        res.status(404).json({
            message: "not found",
        });
    })
);

module.exports = server;
