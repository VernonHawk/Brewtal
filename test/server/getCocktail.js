"use strict";

require("chai").should();
const request = require("supertest");

const startServer = require("../../server/server");
const {
    validParams, getImages, 
    getShapedImages, getImageShape, shapeImage, 
    composeImages, dataToBase64
} = require("../../server/controllers/cocktailController");

describe.only("Get cocktail", () => {
    let SERVER = {};

    before("Start server", () => {
        SERVER = startServer();
    });

    describe("Valid params", () => {
        it("should return true on valid params", () => {
            const mocks = [
                { layer1: "orange", layer2: "stones", layer3: "abc-def", layer4: "p" },
                { layer1: "rotten-eggs", layer2: "st-o", layer3: "a" },
                { layer1: "tesing", layer2: "t-c-p" },
                { layer1: "test-case" },
                { }
            ];

            mocks.map( mock => validParams(mock).should.be.true );
        });

        it("should return false if there are any unexpected params", () => {
            const mocks = [
                { layer1: "orange", layer2: "stones", layer3: "abc-def", layer4: "p", unexpected: "param" },
                { layer1: "lemon", layer2: "sticks", layer5: "too-high" },
                { shouldnt: "be-here" }
            ];

            mocks.map( mock => validParams(mock).should.be.false );
        });

        it("should return false if ingredients id's are invalid", () => {
            const mocks = [
                { layer1: "valid", layer2: "also-valid", layer3: "Even-This", layer4: "not valid" },
                { layer1: "also-not-valid1111" },
                { layer1: "nope-" },
                { layer1: "///no" },
            ];

            mocks.map( mock => validParams(mock).should.be.false );
        });

        it("should return false if there are holes", () => {
            const mocks = [
                { layer1: "first", layer3: "third-already", layer4: "not valid" },
                { layer2: "too-soon" },
                { layer2: "definitely", layer4: "not" }
            ];

            mocks.map( mock => validParams(mock).should.be.false );
        });
    });

    describe("Get images requests", () => {
        it("should return array of promises of length n + 1 with n ingredients", () => {
            const ingredients = [ "orange", "stone", "rotten-eggs" ];

            const requests = getImages(ingredients);

            requests.should.be.a("promise");
        });

        it("promises should resolve to image objects", async () => {
            const ingredients = [ "beer", "spoiled-milk", "grass" ];

            const requests = await getImages(ingredients);
            
            requests.should.be.an("array").and.have.lengthOf(ingredients.length + 1);
            requests.map( req => req.should.be.instanceOf(Object)
                                    .and.have.all.keys(
                "AcceptRanges", "LastModified", "ContentLength", "ETag", "ContentType", "Metadata", "Body")
            );
            requests.map( req => req.ContentType.should.equal("image/svg+xml") );
        });

    });

    describe("Get shaped images", () => {

    });

    describe("Get image shape", () => {

    });

    describe("Shape image", () => {

    });

    describe("Compose images", () => {

    });

    describe("Data to base64", () => {

    });

    describe("Response", () => {
        it("should be json with status 200 when no params", () =>
            request(SERVER)
                .get("/api/cocktail")
                .expect("Content-Type", /json/)
                .expect(200)
        );
    });

    after("Shut down server", done => {
        SERVER.close(done);
    });
});