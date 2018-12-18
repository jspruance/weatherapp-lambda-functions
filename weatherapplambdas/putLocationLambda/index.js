"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

  const params = {
    TableName: "Locations",
    Item: {
      email_address: { S: "jgspruance@gmail.com" },
      locations: { SS: ["Seattle", "Krasnoyarsk", "Oslo"] }
    }
  };

  // Call DynamoDB to add the item to the table
  try {
    const data = await ddb.putItem(params).promise();
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
