"use strict";

const dynamo = require("../dynamoDB");

/**
 * Get ingredients list
 * 
 * @async
 * 
 * @param {Object} req Request object
 * @param {Object} res Response object
 * 
 * @returns {Object<[Object<string, string, string, string>]> | Object<string, string>} 
 *          Response with ingredients list OR error
 */
async function getIngredients(req, res) {
    try {
        const data = await dynamo.scan({ TableName: "Ingredients" }).promise();
        
        const ingredients = data.Items.map( ({ Id: id, Name: name, Description }) => ({
            id, 
            name: name || id,
            description: Description || "",
            table: `https://s3.${ process.env.REGION }.amazonaws.com/${ process.env.BUCKET_TABLE }/${ id }.svg`,
            glass: `http://d3d6keyfsww29d.cloudfront.net/${ id }.svg`
        }));
        
        res.status(200).json({ ingredients });
    } catch (err) {
        console.error(err);
        const error = { cause: "ingredients", message: "Couldn't get ingredients" };

        res.status(500).json({ error });
    }
}

module.exports = { getIngredients };