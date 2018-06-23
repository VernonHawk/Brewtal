"use strict";

const express = require("express");
const helmet  = require("helmet");
const path    = require("path");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const router = require("./router");

const app = express();

const BUILD_PATH = path.resolve(`${__dirname}/../build`);

function mapRoutes() {
    app.use("/api", router);

    app.get("*", (req, res) => res.sendFile(`${BUILD_PATH}/index.html`));
}

function startServer() {
    app.use(express.static(BUILD_PATH));
    
    app.use(helmet());

    mapRoutes();

    app.set("port", process.env.PORT || 3000);
    
    return app.listen(app.get("port"), () => console.log(`App listening on port ${app.get("port")}`));
}

module.exports = startServer;