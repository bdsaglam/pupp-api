import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      contentId: event.pathParameters.contentId,
      answers: data.answers,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (error) {
    callback(null, failure({ status: false, error: error }));
  }
}
