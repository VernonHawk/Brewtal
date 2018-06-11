"use strict";

require("chai").should();
const request = require("supertest");

const startServer = require("../../server/server");

describe("Our server", () => {
    let SERVER = {};

    before("Start server", () => {
        SERVER = startServer();
    });

    describe("Started correctly", () => {
        it("should have correct environment variables", () => {
            const env = process.env;

            env.should.have.property("PORT", "3000");
            env.should.have.property("REGION", "eu-west-2");
            env.should.have.property("BUCKET_TABLE", "brewtal.table");
            env.should.have.property("BUCKET_GLASS", "brewtal.glass");
            env.should.have.property("AWS_ACCESS_KEY_ID").that.is.a("string");
            env.should.have.property("AWS_SECRET_ACCESS_KEY").that.is.a("string");
        });
    });

    describe("Sending web page", () => {
        it("should return html with status 200 on route /", () =>
            request(SERVER)
                .get("/")
                .expect("Content-Type", /text\/html/)
                .expect(200)
        );
        
        it("should return html with status 200 on any route other than defined", () =>
            request(SERVER)
                .get("/abc")
                .expect("Content-Type", /text\/html/)
                .expect(200)
        );
    });

    after("Shut down server", done => SERVER.close(done) );
});
