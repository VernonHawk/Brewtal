"use strict";

require("chai").should();
const request = require("supertest");

const startServer = require("../../server/server");
const { getImageLink } = require("../../server/controllers/ingredientsController");

describe("Get ingredients", () => {
    const REGION = process.env.REGION;

    let SERVER = {};

    before("Start server", () => {
        SERVER = startServer();
    });

    describe("Image link", () => {
        it("should be correct with correct arguments", () => {
            const mocks = [
                {
                    data: { id: "id", bucket: "bucket" },
                    result: `https://s3.${REGION}.amazonaws.com/bucket/id.svg`
                },
                {
                    data: { id: "aasfas", bucket: "allafsal" },
                    result: `https://s3.${REGION}.amazonaws.com/allafsal/aasfas.svg`
                }
            ];

            mocks.map( ({ data, result }) => getImageLink(data).should.equal(result) );
        });

        it("should throw 'Missing params' error when arguments are missing", () => {
            const mocks = [
                { data: { id: "", bucket: "" } },
                { data: { id: undefined, bucket: "fUnCtioN" } },
                { data: { id: "id", bucket: null } }
            ];

            mocks.map( ({ data }) => 
                ( () => getImageLink(data) ).should.throw(Error, "Missing params") );
        });
    });

    describe("Response", () => {
        it("should be json with status 200", () =>
            request(SERVER)
                .get("/api/ingredients")
                .expect("Content-Type", /json/)
                .expect(200)
        );
    
        it("should have property 'ingredients', which is a not empty array", async () => {
            const resp = await request(SERVER).get("/api/ingredients");
            
            resp.body.should
                .have.property("ingredients")
                .that.is.an("array")
                .that.is.not.empty;
        });
    
        it("should have all ingredients with required properties", async () => {
            const resp = await request(SERVER).get("/api/ingredients");
    
            resp.body.ingredients
                .every( item => 
                    item.should.have.all.keys("id", "name", "description", "glass", "table"));
        });

        it("should have correct links", async () => {
            const resp = await request(SERVER).get("/api/ingredients");
    
            const letters = "([a-z]|[A-Z])+";
            const linkRegexp = new RegExp(
                `^https://s3.${REGION}.amazonaws.com/${letters}((-|.)${letters})*/${letters}(-${letters})*.svg$`
            );

            resp.body.ingredients
                .every( ({ glass, table }) => linkRegexp.test(glass) && linkRegexp.test(table) )
                .should.be.true;
        });
    });

    after("Shut down server", done => {
        SERVER.close(done);
    });
});
