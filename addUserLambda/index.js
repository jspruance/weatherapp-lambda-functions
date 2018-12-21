"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  
  let requestBody = JSON.parse(event.body);
  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Users",
    Item: {
      id: { S: requestBody.id }
    }
  };

  // Call DynamoDB to add the item to the table
  try {
    const data = await ddb.putItem(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put locations. Error: ${err}`;
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

