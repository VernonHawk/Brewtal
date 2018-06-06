"use strict";

const express    = require("express");
const helmet     = require("helmet");
const path       = require("path");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const router = require("./server/router");

const app = express();

const CLIENT_PATH = path.resolve(`${__dirname}/client`);

function mapRoutes() {
    app.use("/api", router);

    app.get("*", (req, res) => res.sendFile(`${CLIENT_PATH}/index.html`));
}

function startServer() {
    app.use(express.static(CLIENT_PATH));
    
    app.use(helmet());

    mapRoutes();

    app.set("port", process.env.PORT || 3000);
    
    app.listen(app.get("port"), () => console.log(`App listening on port ${app.get("port")}`)); 
}

startServer();

module.exports.start = startServer;