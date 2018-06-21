"use strict";

const DynamoDB = require("aws-sdk/clients/dynamodb");

const region = process.env.REGION;

module.exports = new DynamoDB.DocumentClient({ region });