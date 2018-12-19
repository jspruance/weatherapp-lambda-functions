"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Locations",
    Key: {
      email_address: { S: "jgspruance@gmail.com" }
    }
  };

  // Call DynamoDB to get the item from the table
  try {
    const data = await ddb.getItem(params).promise();
    // data.Item.locations.SS
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get locations. Error: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      my_header: "my_value"
    },
    body: responseBody,
    isBase64Encoded: false
  };

  return response;
};
