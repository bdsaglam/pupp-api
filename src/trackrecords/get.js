import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, notFound, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      contentId: event.pathParameters.contentId,
    }
  };

  try {
    const data = await dynamoDbLib.call("get", params);
    if (data.Item) {
      // Return the retrieved item
      callback(null, success(data.Item));
    } else {
      callback(null, notFound({ status: false, error: "Item not found." }));
    }
  } catch (error) {
    callback(null, failure({ status: false, error: error}));
  }
}
