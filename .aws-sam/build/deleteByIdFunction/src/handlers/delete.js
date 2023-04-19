
const dynamoHandler = require('../dynamoHandler/dynamoHandler')
exports.deleteByIdHandler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`delete method only accept DELETE method, you tried: ${event.httpMethod}`)
  }
  console.info('received:', event)
  const id = event.pathParameters.id
  if(!id) throw new Error('No id given')
  await dynamoHandler.deleteItem(id)

  const response = {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
  }
}
  return response
}
