"use strict";

require("chai").should();
let client = {};
const {
    JSDOM
} = require("jsdom");
const jsdom = new JSDOM();
const {
    window
} = jsdom;
const {
    document
} = window;
global.$ = require("jquery")(window);
global.window = window;
global.document = document;
const options = {
    contentType: 'text/html'
}
let root = {};

describe("Our client", () => {
    before("Connect client", () => {
        client = require("../../client/js/index.js");
    });

    describe("Class Ingredients testing...", () => {
        beforeEach(() => {
            return JSDOM.fromFile("client/index.html", options)
                .then((dom) => {
                    root = dom.window.document;
                });
        });
        it("should execute method 1", function (done) {
            let el = $(root).find('#ingredients');
            el.length.should.to.equal(1);
            done();
        });
    });
});