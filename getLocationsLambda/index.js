"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

  const params = {
    TableName: "Locations",
    Key: {
      email_address: { S: "jgspruance@gmail.com" }
    }
  };

  // Call DynamoDB to get the item from the table
  try {
    const data = await ddb.getItem(params).promise();
    data.Item.locations.SS.map(location => console.log(location));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
