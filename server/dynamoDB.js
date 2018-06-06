"use strict";

const DynamoDB = require("aws-sdk/clients/dynamodb");

module.exports = new DynamoDB.DocumentClient({ region: process.env.REGION });