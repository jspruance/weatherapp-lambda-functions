"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2" });

  let responseBody = "";
  let statusCode = 0;
  const { id } = event.pathParameters;
  const { locations } = event.body.locations;

  const params = {
    TableName: "Users",
    Item: {
      id: id,
      locations: locations
    }
  };

  // Call DynamoDB to add the item to the table
  try {
    const data = await docClient.put(params).promise();

    //const data = await docClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
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
