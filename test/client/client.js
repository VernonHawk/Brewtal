"use strict";

require("chai").should();
const request = require("supertest");

let client = {};

describe("Our client", () => {
    const {JSDOM} = require("jsdom");
    const jsdom = new JSDOM(``);
    const {window} = jsdom;
    const {document} = window;
    global.$ = require("jquery")(window);
    global.window = window;
    global.document = document;
    
    before("Connect client", () => {
        client = require("../../client/js/index.js");
    });

    describe("Test", () => {
        it("pow", () =>

            (3+3).should.equal(6)        

    );
    });
});