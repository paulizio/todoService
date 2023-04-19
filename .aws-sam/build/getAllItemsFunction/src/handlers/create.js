const uuid = require('uuid')
const dynamoHandler = require('../dynamoHandler/dynamoHandler')
exports.createItemHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  console.info('received:', event)
  const body = JSON.parse(event.body)
  const newItem = {
    task: body.task,
    todoType: 'TASK#',
    id: uuid.v4()
  }
  const createParams = {
    item: newItem
  }
  await dynamoHandler.create(createParams)

  const { todoType, ...responseBody } = newItem
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),    
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
  }
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}
