const dynamoHandler = require('../dynamoHandler/dynamoHandler')
exports.getAllItemsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`)
  }
  const data = await dynamoHandler.getAll()
  const items = data?.Items ?? []
  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
  }
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}
