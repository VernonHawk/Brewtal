"use strict";

const DynamoDB = require("aws-sdk/clients/dynamodb");
const S3 = require("aws-sdk/clients/s3");

const region = process.env.REGION;

module.exports = {
    dynamo: new DynamoDB.DocumentClient({ region }),
    s3: new S3({ region })
};