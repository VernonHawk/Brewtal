"use strict";

require("chai").should();
const request = require("supertest");


describe("Our server", () => {
    let SERVER = {};
    
    before("Start server", () => {
        SERVER = require("../../server.js");
    });

    describe("Server started correctly", () => {
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

    describe("Get ingredients", () => {
        it("should return json with status 200", () =>
            request(SERVER)
                .get("/api/ingredients")
                .expect("Content-Type", /json/)
                .expect(200)
        );

        it("response should have property 'ingredients', which is a not empty array", async () => {
            const resp = await request(SERVER).get("/api/ingredients");
            
            resp.body.should
                .have.property("ingredients")
                .that.is.an("array")
                .that.is.not.empty;
        });

        it("all ingredients should have properties: name, description, table and glass", async () => {
            const resp = await request(SERVER).get("/api/ingredients");

            resp.body.ingredients
                .every( item => item.should.have.all.keys("name", "description", "glass", "table"));
        });
    });

    describe("Get cocktail", () => {
        it("should return json with status 501", () =>
            request(SERVER)
                .get("/api/cocktail")
                .expect("Content-Type", /json/)
                .expect(501)
        );
    });

    after("Shut down server", done => {
        SERVER.close(done);
    });
});
