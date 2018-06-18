"use strict";

const { dynamo } = require("../awsConnect");

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
            table: getImageLink({ id, bucket: process.env.BUCKET_TABLE }),
            glass: getImageLink({ id, bucket: process.env.BUCKET_GLASS })
        }));
        
        res.status(200).json({ ingredients });
    } catch (err) {
        console.error(err);
        const error = { cause: "ingredients", message: "Couldn't get ingredients" };

        res.status(500).json({ error });
    }
}

/**
 * Get link to the image at S3

 * @param {Object} params Function params
 * @param {String} params.id Igredient id
 * @param {String} params.bucket Bucket name
 * 
 * @returns {String} Link to the image
 */
function getImageLink({ id, bucket }) {
    if (!id || !bucket) {
        throw new Error("Missing params");
    }

    return `https://s3.${ process.env.REGION }.amazonaws.com/${ bucket }/${ id }.svg`;
}

module.exports = { getIngredients, getImageLink };