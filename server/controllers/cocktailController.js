"use strict";

const { s3 } = require("../awsConnect");

/**
 * Get cocktail image
 * 
 * @param {Object} req Request object
 * @param {Object} req.query Request query params
 * @param {String} req.query.layer1 Bottom cocktail layer
 * @param {String} req.query.layer2 Second cocktail layer
 * @param {String} req.query.layer3 Third cocktail layer
 * @param {String} req.query.layer4 Top cocktail layer
 * @param {Object} res Response object
 * 
 * @returns {Object<string> | Object<string, string>>} Response with cocktail image OR error
 */
function getCocktail(req, res) {
    res.status(501).json(req.query);
}

module.exports = { getCocktail };