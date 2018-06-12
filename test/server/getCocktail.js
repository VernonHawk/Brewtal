"use strict";

require("chai").should();
const request = require("supertest");

const startServer = require("../../server/server");

describe("Get cocktail", () => {
    let SERVER = {};

    before("Start server", () => {
        SERVER = startServer();
    });

    it("should return json with status 501", () =>
        request(SERVER)
            .get("/api/cocktail")
            .expect("Content-Type", /json/)
            .expect(501)
    );

    after("Shut down server", done => {
        SERVER.close(done);
    });
});