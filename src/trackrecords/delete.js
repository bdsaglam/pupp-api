import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      contentId: event.pathParameters.contentId
    }
  };

  try {
    const data = await dynamoDbLib.call("delete", params);
    callback(null, success({ status: true}));
  } catch (error) {
    callback(null, failure({ status: false, error: error }));
  }
}
