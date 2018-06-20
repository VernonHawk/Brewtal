"use strict";

require("chai").should();
const request = require("supertest");

const startServer = require("../../server/server");

describe("Get ingredients", () => {
    const REGION = process.env.REGION;

    let SERVER = {};

    before("Start server", () => {
        SERVER = startServer();
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
            const s3Regexp = new RegExp(
                `^https://s3.${REGION}.amazonaws.com/${letters}((-|.)${letters})*/${letters}(-${letters})*.svg$`
            );
            
            const cdnRegexp = new RegExp(
                `^http://d3d6keyfsww29d.cloudfront.net/${letters}(-${letters})*.svg$`
            );

            resp.body.ingredients
                .every( ({ glass, table }) => cdnRegexp.test(glass) && s3Regexp.test(table) )
                .should.be.true;
        });
    });

    after("Shut down server", done => {
        SERVER.close(done);
    });
});
