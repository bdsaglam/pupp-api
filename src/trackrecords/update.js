import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      contentId: event.pathParameters.contentId,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET answers = :answers, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":answers": data.answers ? data.answers : {},
      ":updatedAt": Date.now(),
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const data = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (error) {
    callback(null, failure({ status: false, error: error }));
  }
}
