"use strict";

require("chai").should();
const { JSDOM } = require("jsdom");
const jsdom = new JSDOM();
const $ = require("jquery")(jsdom.window);

let doc = {};

describe("Our client", () => {
    describe("Page loading correctly...", () => {
        beforeEach( async () => {
            const dom = await JSDOM.fromFile("client/index.html");
            
            doc = dom.window.document;
        });

        it("should have ingredients container", () => {
            const el = $(doc).find("#ingredients");

            el.length.should.equal(1);
        });
    });
});